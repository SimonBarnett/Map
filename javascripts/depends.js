class depends {
    /**
     * Constructs a new instance of the Depends class.
     * @param {Function} onHasDepends - The callback function to be executed when all dependencies are loaded.
     */
    constructor(onHasDepends) {
        this._depends = [];
        this._loaded = [];
        this._loading = [];
        this._onHasDepends = onHasDepends;
    }

    /**
     * Adds a dependency to the list of dependencies.
     * @param {string} name - The name of the dependency.
     * @param {Array<string>} dependencies - An array of dependency names.
     */
    add(name, dependencies) {
        if(!this._depends.includes(name)) {
            this._depends.push(name)
            this._depends[name] = dependencies;
            for(let i in dependencies) {
                if(!this._depends.includes(dependencies[i])) {
                    alert("Dependency ["+ dependencies[i] +"] not found for ["+ name +"]");
                }
            }
        }
    }

    /**
     * Checks if all dependencies of a given module are loaded.
     * @param {string} name - The name of the module.
     * @returns {boolean} - True if all dependencies are loaded, false otherwise.
     */
    depLoaded(name) {
        let f = true;
        for (let d = 0; d < this._depends[name].length; d++) {
            if (!this._loaded.includes(this._depends[name][d])) {
                f = false;
                break;
            }
        }
        return f;
    }

    /**
     * Checks if all dependencies are loaded.
     * @returns {boolean} Returns true if all dependencies are loaded, false otherwise.
     */
    allLoaded() {
        let f = true;
        for (let i = 0; i < this._depends.length; i++) {
            if (!this._loaded.includes(this._depends[i])) {
                f = false;
                break;
            }
        }
        return f;
    }

    /**
     * Executes a chain of dependent scripts.
     */
    chain() {
        var ch = this
        for (let i = 0; i < this._depends.length; i++) {
            if (!this._loading.includes(this._depends[i]) && this.depLoaded(this._depends[i])) {
                var script = document.createElement('script');
                script.src = 'javascripts/' + ch._depends[i];
                script.onload = function(){
                    ch._loaded.push(this.src.split('/').pop());
                    if (ch.allLoaded()) {
                        ch._onHasDepends()
                    } else {
                        ch.chain()
                    }
                };
                ch._loading.push(ch._depends[i]);
                document.head.appendChild(script);
            }
        }
    }

}

