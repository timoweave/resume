const fs = require('fs');
const Models = require('./models');

fs.readFile('./data.json', 'utf8', function(err, content){
  if(err) throw err;

  const data = JSON.parse(content);
  console.log(data);

  data.experiences.forEach(function(experience) {
    const exp = Models.Experience(experience);
    exp.save();
  });

  data.technicals.forEach(function(tech) {
    const technical = Models.Technical(tech);
    technical.save();
  });

  data.educations.forEach(function(edu) {
    const education = Models.Education(edu);
    education.save();
  });

  data.contacts.forEach(function(cont) {
    const contact = Models.Contact(cont);
    contact.save();
  });

  data.users.forEach(function(usr) {
    const user = Models.User(usr);
    user.save();
  });

});
