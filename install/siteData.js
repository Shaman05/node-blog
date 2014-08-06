/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 1/30/13
 * Time: 1:33 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = function (){
  return {
    master: '{$master}',
    description: 'add a description for your site',
    time: function(){
      return new Date().getFullYear();
    }()
  }
};