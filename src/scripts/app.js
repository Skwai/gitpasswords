import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import Github from 'github-api';
import CryptoJS from 'crypto-js';

import Entry from './models/entry';

import jQuery from "jquery";
import toastr from "toastr";

// https://github.com/michael/github

class App {
	
  constructor(test = false) {
		
    this.github;
		this.user;
		
		this.filename = 'passwords.txt';
		this.branch = 'master';
				
    this.vue = new Vue({
      el: '#app',
			data: {
				username: null,
				password: null,
				
				repos: [],
				selectedrepo: null,				
				repo: null,
				
				data: null,
				secret: null,					
						
				entries: [],
				entry: null,
			},
			methods: {
				
				saveEntries: () => {
					this.saveEntries();
				},
				
				saveEntry: () => {
					
				},
				
				viewEntry: (index) => {
					this.vue.$set('entry', this.vue.entries[index]);
				},
				
				addEntry: () => {
					const entry = new Entry({
						name: 'New password' 
					});
					
					this.vue.entries.push(entry);
					this.vue.$set('entry', entry);
				},
				
				deleteEntry: () => {					
					const currentEntry = JSON.parse(JSON.stringify(this.vue.$data.entry));
					
					this.vue.$data.entries.forEach((_entry, index) => {	
						const entry = JSON.parse(JSON.stringify(_entry));
						
						if (Object.is(currentEntry, entry)) {
							this.vue.entries.slice(index, 1);
						}
						
						console.log(entry, currentEntry, Object.is(currentEntry, entry));						
					});
				},
				
				login: () => {
					this.login( this.vue.username, this.vue.password );
					this.getRepos();
				},
				
				selectRepo: () => {
					this.selectRepo(this.vue.selectedrepo);
					this.getPasswords();
				},
				
				decryptPasswords: () => {
					if (!this.vue.secret) {
						toastr.error("You need to enter your passphrase to decrypt your passwords");
						return;
					}
					
					this.decryptPasswords( this.vue.data, this.vue.secret );
				}
				
			}
    });
		
		if (test) {
			this.login('Skwai', 'b2gg8y9c');
			
			const repo = this.github.getRepo('Skwai', 'jsonpassword');			
			this.repo = repo;			
			this.vue.$set('repo', repo);
			this.vue.$set('secret', 'test');
			
			this.getPasswords(() => {				
				this.decryptPasswords( this.vue.data, this.vue.secret );
			});
		}
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
		
		// TODO; Capture failed decryption
		try {
			const base64 = CryptoJS.AES.decrypt( data, secret ).toString(CryptoJS.enc.Utf8);		
			const json = atob( base64 );
			const entries = this.parseEntries(JSON.parse(json));
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
	saveEntries() {
		
		const content = this.encryptPasswords(this.vue.$data.entries, this.vue.$data.secret);			
		const message = 'Passwords updated';
		
		console.log(content);
		this.repo.write(this.branch, this.filename, content, message, {}, (err) => {
			if (err) {
				toastr.error('There was a problem saving your passwords to GitHub');
				return;
			}						
			toastr.success('Your passwords have been saved');
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
	getPasswords(cb = function() {}) {
		this.repo.read(this.branch, this.filename, (err, data) => {
			if (err) {
				toastr.success("We loaded the repository but there was no 'passwords.txt' file");
				return;
			}
			
			this.vue.$set('data', data);
			
			cb();
		});
	}
	
	/**
	 * Get the user's repositories
	 */
	getRepos() {
		this.user = this.github.getUser();
		this.user.repos({}, (err, repos) => {
			if (err) {
				if (err.error = 401) {
					toastr.error("Could not authenticate. Please check your login details");
				}
				
				return false;
			}
			
			this.repos = repos;
			this.vue.$set('repos', this.repos);
		});
	}
	
}

export default App; 