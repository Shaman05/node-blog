/**
 * Created with JetBrains PhpStorm.
 * User: chenD1
 * Date: 1/11/13
 * Time: 12:46 PM
 * To change this template use File | Settings | File Templates.
 */

module.exports = {
    getPubYear: function(pubtime){
        return parseInt(pubtime.split('-')[0]);
    },

    getTime: function(){
        var now = new Date();
        var year = now.getFullYear();
        var month = formatNumber(now.getMonth() + 1);
        var date = formatNumber(now.getDate());
        var h = formatNumber(now.getHours());
        var m = formatNumber(now.getMinutes());
        var s = formatNumber(now.getSeconds());
        return year + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s;

        function formatNumber(number){
            return number > 10 ? number : '0' + number;
        }
    },

    transformContent: function(content){
        return content.split('[[split]]').join('');
    },

    transformTags: function(tags){
        return tags.split(',');
    },

    transformSummry: function(content){
        return content.split('[[split]]')[0];
    }
};
