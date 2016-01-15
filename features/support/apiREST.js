var
  config = require('./config')(),
  rp = require('request-promise'),
  apiVersion = require('../../package.json').apiVersion;
  apiVersion = '1.0';

var ApiREST = function () {
  this.world = null;
};

ApiREST.prototype.init = function (world) {
  this.world = world;
};

ApiREST.prototype.disconnect = function () {};

ApiREST.prototype.apiPath = function (path) {
  return config.url + encodeURI('/api/1.0/' + path);
};

ApiREST.prototype.apiBasePath = function (path) {
  return config.url + encodeURI('/api/' + path);
};

ApiREST.prototype.callApi = function (options) {
  return rp(options);
};

ApiREST.prototype.get = function (id, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/' + id),
    method: 'GET',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.search = function (filters, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/_search'),
    method: 'POST',
    json: filters
  };

  return this.callApi(options);
};

ApiREST.prototype.count = function (filters, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/_count'),
    method: 'POST',
    json: filters
  };

  return this.callApi(options);
};

ApiREST.prototype.create = function (body, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/_create'),
    method: 'POST',
    json: body
  };

  return this.callApi(options);
};

ApiREST.prototype.publish = function (body, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection),
    method: 'POST',
    json: body
  };

  return this.callApi(options);
};

ApiREST.prototype.createOrUpdate = function (body, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/' + body._id),
    method: 'PUT',
    json: body
  };

  return this.callApi(options);
};

ApiREST.prototype.update = function (id, body, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/' + id + '/_update'),
    method: 'PUT',
    json: body
  };

  return this.callApi(options);
};

ApiREST.prototype.deleteById = function (id, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/' + id),
    method: 'DELETE',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.deleteByQuery = function (filters, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/_query'),
    method: 'DELETE',
    json: filters
  };

  return this.callApi(options);
};

ApiREST.prototype.deleteCollection = function (index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection),
    method: 'DELETE',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.bulkImport = function (bulk, index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/_bulk'),
    method: 'POST',
    json: bulk
  };

  return this.callApi(options);
};

ApiREST.prototype.globalBulkImport = function (bulk) {
  var options = {
    url: this.apiPath('_bulk'),
    method: 'POST',
    json: bulk
  };

  return this.callApi(options);
};

ApiREST.prototype.putMapping = function (index) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + this.world.fakeCollection + '/_mapping'),
    method: 'PUT',
    json: this.world.schema
  };

  return this.callApi(options);
};

ApiREST.prototype.getStats = function (dates) {
  var options = {
    url: this.apiPath('_getStats'),
    method: 'POST',
    json: dates
  };

  return this.callApi(options);
};

ApiREST.prototype.getLastStats = function () {
  var options = {
    url: this.apiPath('_getLastStats'),
    method: 'GET',
    json: {}
  };

  return this.callApi(options);
};

ApiREST.prototype.getAllStats = function () {
  var options = {
    url: this.apiPath('_getAllStats'),
    method: 'GET',
    json: {}
  };

  return this.callApi(options);
};

ApiREST.prototype.listCollections = function (index, type) {
  var options;

  index = index || this.world.fakeIndex;

  options = {
    url: this.apiPath(index + '/_listCollections'),
    method: 'GET',
    json: true
  };

  if (type) {
    options.url += '/' + type;
  }

  return this.callApi(options);
};

ApiREST.prototype.now = function () {
  var options = {
    url: this.apiPath('_now'),
    method: 'GET',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.truncateCollection = function (index, collection) {
  var options = {
    url: this.apiPath(((typeof index !== 'string') ? this.world.fakeIndex : index) + '/' + (collection || this.world.fakeCollection) + '/_truncate'),
    method: 'DELETE',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.listIndexes = function () {
  var options = {
    url: this.apiPath('_listIndexes'),
    method: 'GET',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.deleteIndexes = function () {
  var options = {
    url: this.apiPath('_deleteIndexes'),
    method: 'DELETE',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.createIndex = function (index) {
  var options = {
    url: this.apiPath(index),
    method: 'PUT',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.deleteIndex = function (index) {
  var options = {
    url: this.apiPath(index),
    method: 'DELETE',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.getServerInfo = function () {
  var options = {
    url: this.apiBasePath('_serverInfo'),
    method: 'GET',
    json: true
  };

  return this.callApi(options)
    .then(res => {
      apiVersion = res.result.serverInfo.kuzzle.api.version;
      return res;
    });
};

ApiREST.prototype.putRole = function (id, body) {
  var options = {
    url: this.apiPath('roles/' + id),
    method: 'PUT',
    json: body
  };

  return this.callApi(options);
};

ApiREST.prototype.getRole = function (id) {
  var options = {
    url: this.apiPath('roles/' + id),
    method: 'GET',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.searchRoles = function (body) {
  var options = {
    url: this.apiPath('roles/_search'),
    method: 'POST',
    json: body
  };

  return this.callApi(options);
};

ApiREST.prototype.deleteRole = function (id) {
  var options = {
    url: this.apiPath('roles/' + id),
    method: 'DELETE',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.putProfile = function (id, body) {
  var options = {
    url: this.apiPath('profiles/' + id),
    method: 'PUT',
    json: body
  };

  return this.callApi(options);
};

ApiREST.prototype.getProfile = function (id) {
  var options = {
    url: this.apiPath('profiles/' + id),
    method: 'GET',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.searchProfiles = function (body) {
  var options = {
    url: this.apiPath('profiles/_search'),
    method: 'POST',
    json: body
  };

  return this.callApi(options);
};

ApiREST.prototype.deleteProfile = function (id) {
  var options = {
    url: this.apiPath('profiles/' + id),
    method: 'DELETE',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.getUser = function (id) {
  var options = {
    url: this.apiPath('users/' + id),
    method: 'GET',
    json: true
  };

  return this.callApi(options);
};

ApiREST.prototype.getCurrentUser = function () {
  return this.callApi({
    url: this.apiPath('users/me'),
    method: 'GET',
    json: true
  });
};

ApiREST.prototype.searchUsers = function (body) {
  return this.callApi({
    url: this.apiPath('users/_search'),
    method: 'POST',
    json: body
  });
};

ApiREST.prototype.deleteUser = function (id) {
  return this.callApi({
    url: this.apiPath('users/' + id),
    method: 'DELETE',
    json: true
  });
};

ApiREST.prototype.putUser = function (id, body) {
  return this.callApi({
    url: this.apiPath('users/' + id),
    method: 'PUT',
    json: body
  });
};

module.exports = ApiREST;
