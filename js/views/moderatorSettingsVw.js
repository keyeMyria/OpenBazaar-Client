var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    showErrorModal = require('../utils/showErrorModal.js'),
    saveToAPI = require('../utils/saveToAPI');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  className: "moderatorSettings",

  events: {
    'click .js-moderatorModal': 'blockClicks',
    'click .js-closeModeratorModal': 'closeModeratorSettings',
    'click .js-moderatorSettingsSave': 'saveModeratorSettings',
    'blur input': 'validateInput'
  },

  initialize: function(options){
    var self = this;
    this.parentEl = $(options.parentEl);

    this.subViews = [];
    this.subModels = [];

    console.log(this.model.attributes);

    this.render();
  },

  render: function(){
    var self = this;

    loadTemplate('./js/templates/moderatorSettings.html', function(loadedTemplate) {
      self.$el.html(loadedTemplate(self.model.toJSON()));

      //append the view to the passed in parent
      self.parentEl.append(self.$el);
    });
    return this;
  },

  saveModeratorSettings: function(){
    "use strict";
    var self = this,
        targetForm = this.$el.find('#moderatorSettingsForm'),
        formData = new FormData(),
        moderatorData = {};

    saveToAPI(targetForm, this.model.get('page').toJSON(), self.model.get('serverUrl') + "profile", function(){
      //do post success stuff here
    }, "", moderatorData);
  },


  blockClicks: function(e) {
    "use strict";
    e.stopPropagation();

  },

  validateInput: function(e) {
    "use strict";
    e.target.checkValidity();
    $(e.target).closest('.flexRow').addClass('formChecked');
  },

  closeModeratorSettings: function() {
    "use strict";
    this.close();
    $('#obContainer').removeClass('overflowHidden').removeClass('blur');
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
  }

});