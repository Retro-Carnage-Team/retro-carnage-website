module.exports = {
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'build',
      outputName: 'report.xml',
    }]
  ]
};