const React = require('react');
module.exports = ({ src, alt, width, height, ...rest }) => {
  return React.createElement('img', { src, alt, width, height, ...rest });
};

