export default class Router extends HTMLElement {
	connectedCallback() {
		this.updateLinks();
		this.navigate(window.location.pathname, document.querySelectorAll("a.nav-link")[0]);
	}

	get routes() {
		return Array.from(this.querySelectorAll("sb-route"))
			.filter(node => node.parentNode === this)
			.map(r => ({
				path: r.getAttribute("path"),
				title: r.getAttribute("title"),
				component: r.getAttribute("component")
			}));
	}

	get outlet() {
		return this.querySelector("sb-outlet");
	}
	
	navigate(url, clickedLink = null) {
		const helper = new Helper();
		const matchedRoute = helper.match(this.routes, url);

		if (matchedRoute !== null) {
			this.activeRoute = matchedRoute;
			document.querySelectorAll("a.nav-link").forEach(link => {
				link.classList.remove('active');
			});
			
			if (clickedLink) {
				clickedLink.classList.add('active');
			}

			window.history.pushState(null, null, url);
			
			this.update();
		}
	}

	update() {
		const { component, title, params = {} } = this.activeRoute;
		if (component) {
			while (this.outlet.firstChild) {
				this.outlet.removeChild(this.outlet.firstChild);
			}
			const view = document.createElement(component);

			document.title = title || document.title;

			for (let key in params) {
				if (key !== "*") view.setAttribute(key, params[key]);
			}
			this.outlet.appendChild(view);
		}
	}

	updateLinks() {
		document.querySelectorAll("a[route]").forEach(link => {
			const target = link.getAttribute("route");
			link.setAttribute("href", target);

			link.onclick = e => {
				e.preventDefault();
				this.navigate(target, link);
			};
		});
	}
}

customElements.define("sb-router", Router);