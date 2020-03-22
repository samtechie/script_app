const Script = require("../models/script");

function scriptResult(scriptStr) {
  var output = []
  var lines = scriptStr.split("\n");
  for (idx in lines) {
    let line = lines[idx];
    if (line.length == 11) {
      throw "Random Error!";
    }
    if (line.startsWith('DoThis')) {
      output.push(line.length);
    } else if (line.startsWith('DoThat')) {
      output.push(line.substring(line.length - 4));
    } else if (line.startsWith('DoTheOther')) {
      output.push(line.length % 2);
    } else {
      throw "Not Valid";
    }
  }
  return output;
};

exports.createScript = (req, res, next) => {
  const script = new Script({
    operation: req.body.operation,
    result: scriptResult(req.body.operation).toString(),
    creator: req.userData.userId
  });
  script
    .save()
    .then(savedScript => {
      res.status(201).json({
        message: "Script Added Successfully",
        scriptId: savedScript._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a script failed!"
      });
    });
  //console.log(script);
};

exports.updateScript = (req, res, next) => {
  const script = new Script({
    _id: req.body.id,
    operation: req.body.operation,
    result: scriptResult(req.body.operation).toString(),
    creator: req.userData.userId
  });
  console.log(script);
  Script.updateOne({ _id: req.params.id, creator: req.userData.userId }, script)
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: "Update successful"
        });
      } else {
        res.status(401).json({
          message: "Not authorized"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update post"
      });
    });
};


exports.getScripts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const scriptQuery = Script.find();
  let fetchedScripts;
  if (pageSize && currentPage) {
    scriptQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  scriptQuery
    .then(documents => {
      fetchedScripts = documents;
      return Script.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Scripts fetched successfully",
        scripts: fetchedScripts,
        maxScripts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Scripts failed"
      });
    });
};

exports.getScript = (req, res, next) => {
  Script.findById(req.params.id)
    .then(script => {
      if (script) {
        res.status(200).json(script);
      } else {
        res.status(404).json({ message: "Script not found" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Scripts failed"
      });
    });
};

exports.deleteScript = (req, res, next) => {
  Script.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: "Deletion successful"
        });
      } else {
        res.status(401).json({
          message: "Not authorized"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Posts failed"
      });
    });
};

