import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
Vue.config.debug = false;

// https://github.com/michael/github
import Github from 'github-api';
import CryptoJS from 'crypto-js';

import Entry from './models/entry';

import jQuery from "jquery";
import toastr from "toastr";

toastr.options = {	
  positionClass: 'toast-bottom-right'
};

class App {
	
  constructor(test = false) {
		
    this.github;   // The github object
		this.user;     // The github user object
		this.entries;  // List of entries
		
		this.filename = 'passwords.txt';
		this.branch = 'master';
				
    this.vue = new Vue({
      el: '#app',
			data: {
				
				// List of booleans for AJAX loading animations
				loading: {
					login: false,
					save: false,
					passwords: false,
					repo_new: false
				},
				
				username: null,
				password: null,
				
				decrypted: false,
				
				repo_type: null,
				repos: [],
				selected_repo: null,
								
				repo: null,
				
				repo_new: {
					name: null,
					description: null,
					private: true,
				},				
				data: null,
				secret: null,					
						
				entries: [],
				entry: null,
			},
			methods: {
				
				// Restore entries to the version retrieved by repo
				undo: () => {
					this.vue.entries = this.parseEntries(JSON.parse(JSON.stringify(this.entries)));
				},
				
				// Save all of the entries in their current state
				saveEntries: () => {
					this.vue.loading.save = true;
					this.saveEntries(() => {
						this.vue.loading.save = false;
					});
				},
				
				// View an entry
				viewEntry: (index) => {
					this.vue.$set('entry', this.vue.entries[index]);
				},
				
				// Create a new entry
				addEntry: () => {
					const entry = new Entry({
						name: 'New password' 
					});
					
					this.vue.entries.push(entry);
					this.vue.$set('entry', entry);
				},
				
				// Delete an entry
				deleteEntry: () => {
					this.vue.$set('entries', this.vue.entries.filter((entry) => {						
						return entry.uuid() !== this.vue.entry.uuid();
					}));
					toastr.success(this.vue.entry.name + ' has been deleted');
					this.vue.entry = null;
				},
				
				// Authenticate user by trying to retrieve their repos
				login: () => {
					this.vue.loading.login = true;
					this.login( this.vue.username, this.vue.password );
					this.getRepos(() => {
						this.vue.loading.login = false;
					});
				},
				
				// Select a repo will do one of two things
				// 1. Try to create a new GitHub repo (repo_type === 'new')
				// 2. Use an existing repository, and try to retrieve the existing password data
				selectRepo: () => {
					if (this.vue.repo_type === 'new') {
						this.vue.loading.repo_new = true;						
						this.createRepo({
							name: this.vue.repo_new.name,
							description: this.vue.repo_new.description,
							private: this.vue.repo_new.private
						}, () => {
							this.vue.loading.repo_new = false;
						});
					} else {
						this.vue.loading.passwords = true;
						this.selectRepo(this.vue.selected_repo);
						this.getPasswords(() => {
							this.vue.loading.passwords = false;						
						});
					}
					
				},
				
				// Decrypt passwords with the user supplied secret. If it fails, warn the user
				decryptPasswords: () => {
					if (!this.vue.secret) {
						toastr.error("You need to enter your passphrase to decrypt your passwords");
						return;
					}
					
					if (this.vue.data) {		
						this.decryptPasswords( this.vue.data, this.vue.secret );
					}
					
					this.vue.decrypted = true;			
				}
				
			}
    });
  }
	
	/**
	 * Create a new GitHub repository
	 */
	createRepo( args = {}, callback = () => {} ) {
		
		const defaults = {
			name: 'passwords',
			description: 'Git password repository',
			private: 'true',			
		};
		
		const opts = Object.assign( defaults, args );
		opts.private = opts.private === 'false' ? false : true;
		
		this.user.createRepo( opts, (err, res) => {
			// Error creating the repository
			if (err) {
				console.log(err);
				const response = JSON.parse(err.request.response); 
				toastr.error(response.message);
			} else {			
				// Repository has been created successfuully
				toastr.success('Your new repository has been created');
				
				// Create the repository object
				this.repo = this.github.getRepo( res.owner.login, res.name );	
				this.vue.$set('repo', this.repo);
			}
			callback();
		});
	}
	
	/**
	 * Encrypt the passwords
	 */
	encryptPasswords( entries, secret ) {
		entries = this.parseEntries(entries);
		
		const json = JSON.stringify( entries );
		const base64 = btoa(json);
		const encrypted = CryptoJS.AES.encrypt( base64, secret );
				
		return encrypted.toString();
	}
	
	/**
	 * Decrypt the password data
	 */	
	decryptPasswords(data, secret) {
		
		try {
			const base64 = CryptoJS.AES.decrypt( data, secret ).toString(CryptoJS.enc.Utf8);		
			const json = atob( base64 );
			const entries = this.parseEntries(JSON.parse(json));
			
			// Create a duplicate of entries so we can 'undo' changes if required
			// JSONify it so it isn't a reference of another object
			this.entries = JSON.parse(JSON.stringify(entries));
			
			this.vue.$set('entries', entries);
		}
		catch (err) {
			toastr.error('Passwords couldn\'t be decrypted. Please ensure that your passphrase is correct.')
		}
	}
	
	/**
	 * Parse the entries as new instances of Entry
	 */
	parseEntries( entries ) {
		const _entries = [];
		
		entries.map((entry) => {
			_entries.push( new Entry(entry) );
		});
		
		return _entries;
	}
	
	/**
	 * Save the entries to GitHub
	 */
	saveEntries(callback = () => {}) {				
		const content = this.encryptPasswords(this.vue.$data.entries, this.vue.$data.secret);			
		const message = 'Passwords updated';
		
		console.log(content);
		
		this.repo.write(this.branch, this.filename, content, message, {}, (err) => {
			if (err) {
				toastr.error('There was a problem saving your passwords to GitHub');
			} else {
				toastr.success('Your passwords have been saved');
			}
			
			callback();
		});
	}
	
	/**
	 * Create new github instance
	 * @param string username The user's github username
	 * @param string password The users' github password
	 */
	login(username, password) {		
		this.github = new Github({
			username: username,
			password: password, 
			auth: 'basic'
		});
	}
	
	/**
	 * Select a repo
	 */
	selectRepo(index) {
		const repo = this.vue.repos[index];
		
		this.repo = this.github.getRepo( repo.owner.login, repo.name );				
		this.vue.$set('repo', this.repo);
	}
	
	/**
	 * Get the password data from the file in the repository
	 */
	getPasswords(callback = () => {}) {
		this.repo.read(this.branch, this.filename, (err, data) => {
			
			if (err) {
				if (err.error === 404) {					
					// No password file exists yet
				} else {					
					// Some other error has happened					
					toastr.success('There was a problem retrieving your password file');
				}
				
				return;
			}
			
			this.vue.$set('data', data);
			
			callback();
		});
	}
	
	/**
	 * Get the user's repositories
	 */
	getRepos(callback = () => {}) {
		this.user = this.github.getUser();
		this.user.repos({}, (err, repos) => {
			if (err) {
				if (err.error = 401) {
					toastr.error("Could not authenticate. Please check your login details");
				}
			} else {			
				this.repos = repos;
				this.vue.$set('repos', this.repos);
			}
			callback();
		});
	}
	
}

export default App; 