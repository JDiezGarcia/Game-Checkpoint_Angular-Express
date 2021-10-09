module.exports = (field) => function (next) {
    this.populate(field);
    next();
};