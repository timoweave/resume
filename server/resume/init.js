const fs = require('fs');
const Models = require('./models');
const path = require('path');
const data_file = path.resolve(__dirname, 'data.json');
const config = require('../../config');

Models.event.once('ready', () => {
  fs.readFile(data_file, 'utf8', read_and_save);
});

const url = config.isDeveloping ? config.mlocal : config.mlab;
Models.connect(url);

function read_and_save(err, data_content) {

  if (err) throw err;

  const data = JSON.parse(data_content);
  const coll_names = Object.keys(data).sort();
  const saving_data = coll_names.reduce((saving_list, coll_name) => {
    const class_name = coll_name[0].toUpperCase() + coll_name.slice(1,-1);
    data[coll_name].forEach((coll) => {
      console.log("read", coll);
      const doc = new Models[class_name](coll);
      saving_list.push(doc);
    });
    return saving_list;
  }, []);

  const saving_done = saving_data.reduce((done, d, i) => {
    return done.then(() => {
      console.log("save", d, i);
      return d.save();
    });
  }, new Promise((res, rej) => (res(1))));

  saving_done.then(() => {
    console.log('done', 'all.....');
    process.exit();
  });
}

