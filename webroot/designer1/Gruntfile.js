module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      bar: {
        src: [
          'html5/ds/js/core/1_util.js', 
          'html5/ds/js/core/2_base.js', 
          'html5/ds/js/core/4_vender.js', 
          'html5/ds/js/core/5_math.js', 
          'html5/ds/js/core/6_ui.text.js', 
          'html5/ds/js/core/7_ui.element.js', 
          'html5/ds/js/core/8_ui.svg.js', 
          'html5/ds/js/core/9_ui.bitmap.js', 
          'html5/ds/js/core/a_container.js', 
          'html5/ds/js/core/b_container.snap.js', 
          'html5/ds/js/core/c_popupmenu.js', 
          'html5/ds/js/core/d_ui.resolution.js', 
          'html5/ds/js/core/e_historymanager.js', 
          'html5/ds/js/core/f_com.aq.bitmap.js', 
          'html5/ds/js/core/g_rapheal.js', 
          'html5/ds/js/core/h_baseEZD.js', 
          'html5/ds/js/core/j_directive.js', 
          'html5/ds/js/core/k_ui.directives.js', 
          'html5/ds/js/core/l_ui.common.js', 

          'html5/ds/js/core/m_ui.js', 
          'html5/ds/js/core/n_parser.js', 
          'html5/ds/js/core/p_ui.controllers.js', 
          'html5/ds/js/core/controllers/ActionController.js', 
          'html5/ds/js/core/controllers/DesignerController.js', 
          'html5/ds/js/step2/controller/saleGoalController.js', 
          'html5/ds/js/step1/controller/step1Controller.js', 
          'html5/ds/js/step2/controller/step2Controller.js', 
          'html5/ds/js/step3/controller/step3Controller.js', 
          'html5/ds/js/step3/controller/addressController.js', 
          'html5/ds/js/step3/controller/addressListController.js', 
          'html5/ds/js/core/controllers/DesignColorsController.js', 
          'html5/ds/js/core/controllers/ProductColorsController.js', 
          'html5/ds/js/core/controllers/AddTextController.js', 
          'html5/ds/js/core/controllers/BrowseProductsController.js', 
          'html5/ds/js/core/controllers/EditTextController.js', 
          'html5/ds/js/core/controllers/ProductCategoriesController.js', 
          'html5/ds/js/core/controllers/ProductRegionController.js', 
          'html5/ds/js/core/q_startangularapp.js', 
          'html5/ds/js/core/r_modal.js', 
          'html5/ds/js/core/i_easyteeservice.js', 
          'html5/ds/js/core/o_window.regist.js', 
          'html5/ds/js/core/t_ready.js', 
          'html5/ds/js/core/s_ajaxcallback.js'
        ],
        dest: 'html5/ds/js/package.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'html5/ds/js/package.js',
        dest: 'html5/ds/js/package.min.js'
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat', 'uglify']);

};