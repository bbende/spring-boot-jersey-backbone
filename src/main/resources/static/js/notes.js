/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// ------------------------- Models ------------------------------

// Model for a single Note
window.Note = Backbone.Model.extend({
  defaults: {
    text: ''
  },
  url: '/api/notes'
});

// Model for a collection of Notes
window.Notes = Backbone.Collection.extend({
  model: Note,
  url: '/api/notes'
});

// ------------------------- Views------------------------------

// Single Note within NotesView
window.NoteView = Backbone.View.extend({
  template : _.template($('#note-template').html()),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

// Notes view
window.NotesView = Backbone.View.extend({

  template : _.template($('#note-list-template').html()),

  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
  },

  events: {
    'click button': 'createNote'
  },

  render: function(){
    this.$el.empty();
    this.$el.html(this.template());

    this.addAll()
    return this;
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },

  addOne: function(note){
    var noteView = new NoteView({model: note});
    this.$el.append(noteView.render().el);
  },

  createNote: function() {
    this.collection.create({text: $('#note-text').val()}, {wait: true});
    $('#note-text').val('');
    $('#note-text').focus();
  }

});
