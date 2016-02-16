/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';

	config.toolbar = [
	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline','-', 'NumberedList', 'BulletedList', 'HorizontalRule','TextColor'  ] },
	{ name: 'styles', items: [ 'Format' ] },
    { name: 'links', items: [ 'Link' ,'base64image', 'Youtube', 'Table', '-','Outdent', 'Indent','JustifyBlock','JustifyLeft', 'JustifyCenter', 'JustifyRight','-',  'Strike', 'Subscript', 'Superscript', 'Blockquote','-', 'Maximize' ] }
];

// Toolbar groups configuration.
config.toolbarGroups = [
	{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
	{ name: 'links' },
	{ name: 'insert' },
	'/',
	{ name: 'styles' },
	{ name: 'tools' }
];


};
