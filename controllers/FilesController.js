// Filecontroller endpoint description
const { v4: uuidV4 } = require('uuid');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const mongo = require('../utils/db');
const redistClient = require('../utils/redis');

const FilesController = {
  async postUpload(req, res) {
    const token = req.headers['x-token'];
    const key = `auth_${token}`;
    const userID = await redistClient.get(key);
    const { name, type, data } = req.body;
    let { parentId, isPublic } = req.body;

    if (!isPublic) {
      isPublic = false;
    }
    // const parentId = 0;
    // const { isPublic } = req.body || false;
    const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';

    if (userID) {
      // try{
      const user = await mongo.getUserById(userID);
      if (user) {
        try {
          if (!name) {
            res.status(400).json({ error: 'Missing name' }).end();
          } else if (!type) {
            res.status(400).json({ error: 'Missing type' }).end();
          } else if (type !== 'folder' && !data) {
            res.status(400).json({ error: 'Missing data' }).end();
            // } else if (parentId) {
          }
          if (parentId) {
            const parentFile = await mongo.getParentFile(parentId);
            if (!parentFile) {
              res.status(400).json({ error: 'Parent not found' }).end();
            } else if (parentFile.type !== 'folder') {
              res.status(400).json({ error: 'Parent is not a folder' }).end();
            }
          } else {
            parentId = 0;
          }
          const fileName = uuidV4();
          const absPath = `${folderPath}/${fileName}`;
          if (parentId !== 0) {
            parentId = ObjectId(parentId);
          }
          const userId = ObjectId(userID);
          // Add file to database
          const fileId = await mongo.addFile(
            userId,
            name,
            type,
            isPublic,
            parentId,
            absPath,
          );

          // Save file to disk
          if (type !== 'folder') {
            fs.mkdirSync(folderPath, { recursive: true });
            const decodedData = Buffer.from(data, 'base64').toString('binary');
            fs.writeFile(absPath, decodedData, (error) => {
              if (error) {
                console.error(error);
              }
            });
          }

          // const file = await mongo.getFileById(fileId);

          res
            .status(201)
            .json({
              id: fileId, name, type, isPublic, parentId,
            })
            .end();
        } catch (error) {
          console.error(error);
        }
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  },
};

module.exports = FilesController;
