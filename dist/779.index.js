export const id = 779;
export const ids = [779];
export const modules = {

/***/ 2779:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   findUp: () => (/* binding */ findUp)
/* harmony export */ });
/* unused harmony export findUpSync */
/* harmony import */ var node_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1708);
/* harmony import */ var node_fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1455);
/* harmony import */ var node_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3136);
/* harmony import */ var node_fs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3024);
/* harmony import */ var node_path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6760);






const toPath = urlOrPath => urlOrPath instanceof URL ? (0,node_url__WEBPACK_IMPORTED_MODULE_2__.fileURLToPath)(urlOrPath) : urlOrPath;

async function findUp(name, {
	cwd = node_process__WEBPACK_IMPORTED_MODULE_0__.cwd(),
	type = 'file',
	stopAt,
} = {}) {
	let directory = node_path__WEBPACK_IMPORTED_MODULE_4__.resolve(toPath(cwd) ?? '');
	const {root} = node_path__WEBPACK_IMPORTED_MODULE_4__.parse(directory);
	stopAt = node_path__WEBPACK_IMPORTED_MODULE_4__.resolve(directory, toPath(stopAt ?? root));
	const isAbsoluteName = node_path__WEBPACK_IMPORTED_MODULE_4__.isAbsolute(name);

	while (directory) {
		const filePath = isAbsoluteName ? name : node_path__WEBPACK_IMPORTED_MODULE_4__.join(directory, name);
		try {
			const stats = await node_fs_promises__WEBPACK_IMPORTED_MODULE_1__.stat(filePath); // eslint-disable-line no-await-in-loop
			if ((type === 'file' && stats.isFile()) || (type === 'directory' && stats.isDirectory())) {
				return filePath;
			}
		} catch {}

		if (directory === stopAt || directory === root) {
			break;
		}

		directory = node_path__WEBPACK_IMPORTED_MODULE_4__.dirname(directory);
	}
}

function findUpSync(name, {
	cwd = process.cwd(),
	type = 'file',
	stopAt,
} = {}) {
	let directory = path.resolve(toPath(cwd) ?? '');
	const {root} = path.parse(directory);
	stopAt = path.resolve(directory, toPath(stopAt) ?? root);
	const isAbsoluteName = path.isAbsolute(name);

	while (directory) {
		const filePath = isAbsoluteName ? name : path.join(directory, name);

		try {
			const stats = fs.statSync(filePath, {throwIfNoEntry: false});
			if ((type === 'file' && stats?.isFile()) || (type === 'directory' && stats?.isDirectory())) {
				return filePath;
			}
		} catch {}

		if (directory === stopAt || directory === root) {
			break;
		}

		directory = path.dirname(directory);
	}
}


/***/ })

};

//# sourceMappingURL=779.index.js.map