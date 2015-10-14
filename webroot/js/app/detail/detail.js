$(function(){
    function linkage(){
        var province = {
          1:{
            id:1,
            name:"安徽"
          },
          2:{
            id:2,
            name:"浙江"
          }
        };

       var city = {
          1:{
            1:{id:1,Fid:1,name:"合肥"},
            2:{id:2,Fid:1,name:"黄山"}
          },
          2:{
            3:{id:3,Fid:2,name:"杭州"},
            4:{id:4,Fid:2,name:"义乌"}
          }
       };

       var town = {
          1:{
            1:{id:1,Fid:1,name:"包河区"},
            2:{id:2,Fid:1,name:"蜀山区"}
          },
          2:{
            3:{id:3,Fid:2,name:"休宁"},
            4:{id:4,Fid:2,name:"屯溪"}
          },
          3:{
            5:{id:5,Fid:3,name:"西湖区"},
            6:{id:6,Fid:3,name:"江干区"}
          },
          4:{
            7:{id:7,Fid:4,name:"义乌1"},
            8:{id:8,Fid:4,name:"义乌2"}
          }
       };
        //省初始化
        var proStr='';
        for(var o in province){
            var item= province[o];
            proStr+='<option value="'+item.id+'">'+item.name+'</option>';

            //市初始化
            var cityStr='';
            for(var a in city[o]){
                //var cityID=province[a].Fid;
                var items= city[o][a];
                cityStr+='<option value="'+items.id+'">'+items.name+'</option>'

                //区初始化
                var townStr='';
                for(var T in town[a]){
                    var Titems= town[a][T];
                    townStr+='<option value="'+Titems.id+'">'+Titems.name+'</option>'
                }
                $('#area').append(townStr);
            }
            $('#town').append(cityStr);

        }
        $('#province').append(proStr);

        $('#province').change(function () {
            var pid=$(this).val();

        })

    }
    linkage();
})
