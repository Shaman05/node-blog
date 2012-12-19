/* 文章模型
 * 包含: 
 * 1.所有文章的信息获取；
 * 2.指定id文章的内容获取；
 * ...待添加
 */

module.exports = {
  artList : function(){
    return [
      { 
        id: '1',
        title: 'test111111'
      },
      { 
        id: '2',
        title: 'test22222222222'
      }
    ];
  },
  artShow : function(req){
    return req.params.id;
  }    
}
