const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const name = app.getName()
//const ipc = electron.ipcMain


let mainWindow

let template = [
  {
    label: name,
    submenu: [
      {
        label: `About ${name}`,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        accelerator: 'Cmd + Q',
        click: function () {
          app.quit()
        }
      }
    ]
  },
  {
    label: 'Operation',
    submenu: [
      {
        label: 'Sync Content with Github'
      }
    ]
  }
]

function get_personal_config() {
  var config = {
    
      // Your site title (format: page_title - site_title)
      site_title: '个人知识库',
    
      // The base URL of your site (can use %base_url% in Markdown files)
      base_url: '',
    
      // Used for the "Get in touch" page footer link
      support_email: 'fuyajun1983cn@163.com',
    
      // Footer Text / Copyright
      copyright: 'Copyright &copy; '+ new Date().getFullYear() +' - <a href="http://raneto.com">Powered by Raneto</a>',
    
      // Excerpt length (used in search)
      excerpt_length: 400,
    
      // The meta value by which to sort pages (value should be an integer)
      // If this option is blank pages will be sorted alphabetically
      page_sort_meta: 'sort',
    
      // Should categories be sorted numerically (true) or alphabetically (false)
      // If true category folders need to contain a "sort" file with an integer value
      category_sort: true,
    
      // Which Theme to Use?
      theme_dir  : __dirname + '/../node_modules/raneto/themes/',
      theme_name : 'default',
    
      // Specify the path of your content folder where all your '.md' files are located
      // Fix: Needs trailing slash for now!
      // Fix: Cannot be an absolute path
      content_dir : __dirname + '/../content/',
    
      // Where is the public directory or document root?
      public_dir  : __dirname + '/../node_modules/raneto/themes/default/public/',
    
      // The base URL of your images folder,
      // Relative to config.public_dir
      // (can use %image_url% in Markdown files)
      image_url: '../images',
    
      // Add your analytics tracking code (including script tags)
      analytics: '',
    
      // Set to true to enable the web editor
      allow_editing : false,
    
      // Set to true to enable HTTP Basic Authentication
      authentication : false,
    
      // If editing is enabled, set this to true to only authenticate for editing, not for viewing
      authentication_for_edit: true,
    
      // If authentication is enabled, set this to true to enable authentication for reading too
      authentication_for_read: false,
    
      // Google OAuth
      googleoauth: false,
      oauth2 : {
        client_id: 'GOOGLE_CLIENT_ID',
        client_secret: 'GOOGLE_CLIENT_SECRET',
        callback: 'http://localhost:3000/auth/google/callback',
        hostedDomain: 'google.com'
      },
      secret: 'someCoolSecretRightHere',
    
      credentials    : [
        {
          username : 'admin',
          password : 'password'
        },
        {
          username : 'admin2',
          password : 'password'
        }
      ],
    
      //locale: 'zh',
    
      // Sets the format for datetime's
      datetime_format: 'Do MMM YYYY',
    
      // Set to true to render suitable layout for RTL languages
      rtl_layout: false,
    
      // Edit Home Page title, description, etc.
      home_meta : {
        //title       : 'Custom Home Title',
        //description : 'Custom Home Description'
      },
    
      //variables: [
      //  {
      //    name: 'test_variable',
      //    content: 'test variable'
      //  },
      //  {
      //    name: 'test_variable_2',
      //    content: 'test variable 2'
      //  }
      //]
    
      table_of_contents: false
    
    };
    return config;
}

function start_raneto_server() {
  // Modules
  var debug = require('debug')('raneto');

  // Here is where we load Raneto.
  // When you are in your own project repository,
  // Raneto should be installed via NPM and loaded as:
  var raneto = require('raneto');
  //
  // For development purposes, we load it this way in this example:
  //var raneto = require('../app/index.js');

  // Finally, we initialize Raneto
  // with our configuration object
  var raneto_app = raneto(get_personal_config());

  // Load the HTTP Server
  var server = raneto_app.listen(raneto_app.get('port'), function () {
    debug('Express HTTP server listening on port ' + server.address().port);
  });
}

app.on('ready', _ => {

  start_raneto_server();

  mainWindow = new BrowserWindow({
    height: 640,
    width: 480
  })
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  mainWindow.loadURL("http://localhost:3000")
  mainWindow.on('closed', _ => {
    mainWindow = null
  })

})

