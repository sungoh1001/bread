(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(true);\n// Module\nexports.push([module.i, \".bible[data-v-5a7b936e] {\\n  padding: 16px;\\n}\\n.verse[data-v-5a7b936e] {\\n  position: relative;\\n}\\n.index[data-v-5a7b936e] {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 25px;\\n  display: inline-block;\\n  text-align: center;\\n  font-weight: 700;\\n}\\n.text[data-v-5a7b936e] {\\n  display: inline-block;\\n  padding-left: 32px;\\n}\", \"\",{\"version\":3,\"sources\":[\"Page.vue\"],\"names\":[],\"mappings\":\"AA8BA;EACE,aAAA;AA7BF;AAgCA;EACE,kBAAA;AA7BF;AAgCA;EACE,kBAAA;EACA,MAAA;EACA,OAAA;EACA,WAAA;EACA,qBAAA;EACA,kBAAA;EACA,gBAAA;AA7BF;AAgCA;EACE,qBAAA;EACA,kBAAA;AA7BF\",\"file\":\"Page.vue\",\"sourcesContent\":[\"\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n\\n.bible {\\n  padding: 16px;\\n}\\n\\n.verse {\\n  position: relative;\\n}\\n\\n.index {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 25px;\\n  display: inline-block;\\n  text-align: center;\\n  font-weight: 700;\\n}\\n\\n.text {\\n  display: inline-block;\\n  padding-left: 32px;\\n}\\n\"]}]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./src/views/Page.vue?./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/index.js?!./src/views/Page.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib??vue-loader-options!./src/views/Page.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/constants */ \"./src/constants.js\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: src_constants__WEBPACK_IMPORTED_MODULE_0__[\"ROUTE_NAMES\"].PAGE,\n  props: {\n    bible: {\n      type: Object,\n      required: true\n    }\n  }\n});\n\n\n//# sourceURL=webpack:///./src/views/Page.vue?./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Page.vue?vue&type=template&id=5a7b936e&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Page.vue?vue&type=template&id=5a7b936e&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"main\", { attrs: { id: \"page\" } }, [\n    _c(\n      \"ul\",\n      { staticClass: \"bible\" },\n      _vm._l(_vm.bible, function(line, index) {\n        return _c(\"li\", { key: index, staticClass: \"verse\" }, [\n          _c(\"i\", { staticClass: \"index\" }, [_vm._v(_vm._s(index + 1))]),\n          _vm._v(\" \"),\n          _c(\"span\", { staticClass: \"text\" }, [_vm._v(_vm._s(line))])\n        ])\n      }),\n      0\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/views/Page.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options!./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--7-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/resolve-url-loader??ref--7-2!../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true& */ \"./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true&\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"adba0252\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./src/views/Page.vue?./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js??ref--7-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./src/views/Page.vue":
/*!****************************!*\
  !*** ./src/views/Page.vue ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Page_vue_vue_type_template_id_5a7b936e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Page.vue?vue&type=template&id=5a7b936e&scoped=true& */ \"./src/views/Page.vue?vue&type=template&id=5a7b936e&scoped=true&\");\n/* harmony import */ var _Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Page.vue?vue&type=script&lang=js& */ \"./src/views/Page.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _Page_vue_vue_type_style_index_0_id_5a7b936e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true& */ \"./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(\n  _Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Page_vue_vue_type_template_id_5a7b936e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Page_vue_vue_type_template_id_5a7b936e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  \"5a7b936e\",\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"src/views/Page.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./src/views/Page.vue?");

/***/ }),

/***/ "./src/views/Page.vue?vue&type=script&lang=js&":
/*!*****************************************************!*\
  !*** ./src/views/Page.vue?vue&type=script&lang=js& ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=script&lang=js& */ \"./node_modules/vue-loader/lib/index.js?!./src/views/Page.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./src/views/Page.vue?");

/***/ }),

/***/ "./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true&":
/*!**************************************************************************************!*\
  !*** ./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_id_5a7b936e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-style-loader!../../node_modules/css-loader/dist/cjs.js??ref--7-1!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/resolve-url-loader??ref--7-2!../../node_modules/sass-loader/dist/cjs.js??ref--7-3!../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true& */ \"./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/resolve-url-loader/index.js?!./node_modules/sass-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Page.vue?vue&type=style&index=0&id=5a7b936e&lang=scss&scoped=true&\");\n/* harmony import */ var _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_id_5a7b936e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_id_5a7b936e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);\n/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_id_5a7b936e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if([\"default\"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_node_modules_css_loader_dist_cjs_js_ref_7_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_resolve_url_loader_index_js_ref_7_2_node_modules_sass_loader_dist_cjs_js_ref_7_3_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_style_index_0_id_5a7b936e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));\n\n\n//# sourceURL=webpack:///./src/views/Page.vue?");

/***/ }),

/***/ "./src/views/Page.vue?vue&type=template&id=5a7b936e&scoped=true&":
/*!***********************************************************************!*\
  !*** ./src/views/Page.vue?vue&type=template&id=5a7b936e&scoped=true& ***!
  \***********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_5a7b936e_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./Page.vue?vue&type=template&id=5a7b936e&scoped=true& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./src/views/Page.vue?vue&type=template&id=5a7b936e&scoped=true&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_5a7b936e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Page_vue_vue_type_template_id_5a7b936e_scoped_true___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./src/views/Page.vue?");

/***/ })

}]);