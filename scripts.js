const containers = document.querySelectorAll('.nav-link');

containers.forEach(f => f.addEventListener('mouseenter', function () {
	document.querySelectorAll('.header')[0].classList.add('nav-hovered');
}))

containers.forEach(f => f.addEventListener('mouseleave', function () {
	document.querySelectorAll('.header')[0].classList.remove('nav-hovered');
}))

class Helper {
	routeRegExp = /^:(.+)/;

	segmentize = (uri) => {
		return uri.replace(/(^\/+|\/+$)/g, "").split("/");
	}

	match = (routes, uri) => {
		let match;
		const [uriPathname] = uri.split("?");
		const uriSegments = this.segmentize(uriPathname);
		const isRootUri = uriSegments[0] === "/";

		for (let i = 0; i < routes.length; i++) {
			const route = routes[i];
			const routeSegments = this.segmentize(route.path);
			const max = Math.max(uriSegments.length, routeSegments.length);

			let index = 0;
			let missed = false;
			let params = {};

			for (; index < max; index++) {
				const uriSegment = uriSegments[index];
				const routeSegment = routeSegments[index];
				const fallback = routeSegment === "*";

				if (fallback) {
					params["*"] = uriSegments
						.slice(index)
						.map(decodeURIComponent)
						.join("/");
					break;
				}

				if (uriSegment === undefined) {
					missed = true;
					break;
				}

				let dynamicMatch = this.routeRegExp.exec(routeSegment);

				if (dynamicMatch && !isRootUri) {
					let value = decodeURIComponent(uriSegment);
					params[dynamicMatch[1]] = value;
				} else if (routeSegment !== uriSegment) {
					missed = true;
					break;
				}
			}

			if (!missed) {
				match = { params, ...route };
				break;
			}
		}

		return match || null;
	}

	parseComponentVisuals = async (componentName) => {
		const path = 'components/' + componentName + '/' + componentName;
		return '<style>' + await this.fetchResource(path + '.css') + '</style>' + await this.fetchResource(path + '.html');
	}

	fetchResource = async (path) => {
		const resp = await fetch(path);
		const data = await resp.text();
		return data;
	};
}