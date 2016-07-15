/**
 * Created by suwei on 16/7/13.
 */
require('UIButton,UIWindow,SWBaseViewController,SWTabBarController,UINavigationController,SWHomeViewController,SWCategoryController,SWConcernViewController,SWSearchViewController,SWPlayerUserCenterViewController,JPViewController,UITabBarController,NSArray,UITableView,UIScreen,UIViewController,AppDelegate, UIImageView, UIImage, UIScreen,UITableViewCell,UILabel, NSURL, NSURLRequest,NSURLConnection,NSOperationQueue');
require('UIColor,NSURLResponse,NSData,NSError,NSJSONSerialization,NSDictionary,NSArray, UIViewController,SWTableViewCell');
require('JPEngine').addExtensions(['JPMemory']);
var button
//app代理--------------------------//app代理--------------------------//app代理--------------------------//app代理--------------------------//app代理--------------------------//app代理--------------------------
defineClass('AppDelegate : UIResponder',{
    configRootView:function(){
        //self.ORIGconfigRootView();
        console.log("会有效果吗");
        self.setWindow(UIWindow.alloc().initWithFrame(UIScreen.mainScreen().bounds()));
        var tab = SWTabBarController.alloc().init();
        var nav = UINavigationController.alloc().initWithRootViewController(tab);
        self.window().setRootViewController(nav)  ;
        self.window().makeKeyAndVisible();
    }
})

//自定义tabbarVC-----------------------//自定义tabbarVC-----------------------//自定义tabbarVC-----------------------//自定义tabbarVC-----------------------//自定义tabbarVC-----------------------
defineClass('SWTabBarController:UITabBarController',{
        viewDidLoad:function(){
            self.super().viewDidLoad();
            var vcs = NSArray.arrayWithObjects(SWHomeViewController.alloc().init(),SWCategoryController.alloc().init(),SWConcernViewController.alloc().init(),SWSearchViewController.alloc().init(),SWPlayerUserCenterViewController.alloc().init(),null);
            self.setViewControllers(vcs);
        }
})

// SW 首页------------------------------------------// SW 首页------------------------------------------// SW 首页------------------------------------------// SW 首页------------------------------------------
defineClass('SWHomeViewController:SWBaseViewController',{
    click:function(btn){
        //console.log(btn);
        if(btn.tag() == 1){
            self.view().setBackgroundColor(UIColor.whiteColor());
            button.setBackgroundColor(UIColor.redColor());
            btn.setTag(2);
        }else{
            self.view().setBackgroundColor(UIColor.yellowColor());
            button.setBackgroundColor(UIColor.blueColor());
            btn.setTag(1);
        }
    }
})
defineClass('SWHomeViewController',{
    tapClick:function(tap){
        console.log(tap);
            tap.view().removeFromSuperview();

    }
})

defineClass("SWHomeViewController: SWBaseViewController",{
    viewDidLoad:function(){
        self.super().viewDidLoad();
        button = UIButton.alloc().init();
        self.view().setBackgroundColor(UIColor.redColor());
        //self.view().addSubview(button);
        button.setBackgroundColor(UIColor.redColor());
        button.setFrame({x:20, y:64, width:100, height:100});
        button.addTarget_action_forControlEvents(self,'click:',1<<6);
        button.setTag(1);
        //var tap = require('UITapGestureRecognizer').alloc().initWithTarget_action(self,'tapClick:');
        //self.view().addGestureRecognizer(tap);
        var tableView = UITableView.alloc().initWithFrame({x:0, y:0, width:375, height:UIScreen.mainScreen().bounds().height });
        self.view().addSubview(tableView);
        tableView.setBackgroundColor(UIColor.grayColor());
        tableView.setRowHeight(80);
        tableView.setDataSource(self);
        tableView.setDelegate(self);
        tableView.registerClass_forCellReuseIdentifier(SWTableViewCell.class(),"cell");
        var url= NSURL.URLWithString(self.getProp('urlStr'));
        var request = NSURLRequest.alloc().initWithURL(url);
        var sel = self;
        NSURLConnection.sendAsynchronousRequest_queue_completionHandler(request,NSOperationQueue.mainQueue(),block("NSURLResponse* ,NSData*, NSError*",function(response,data,error) {
            var NSJSONReadingMutableContainers = 1 << 0;
           var dict = NSJSONSerialization.JSONObjectWithData_options_error(data,NSJSONReadingMutableContainers,null);
            dict = dict.objectForKey('result');
            var array = dict.objectForKey('list');
            sel.setProp_forKey(array, "data");
            var data = sel.getProp("data");
            //console.log(data);
            tableView.reloadData();
        }));
    },
    init:function(){
        if(self.ORIGinit()){
            var normalImage = UIImage.imageNamed("home_home_tab");
            var selectImage = UIImage.imageNamed("home_home_tab_s");
            normalImage = normalImage.imageWithRenderingMode(1);
            selectImage = selectImage.imageWithRenderingMode(1);
            self.tabBarItem().setImage(normalImage);
            self.tabBarItem().setSelectedImage(selectImage);

            self.setProp_forKey("http://bangumi.bilibili.com/sponsor/rank/get_sponsor_week_list?access_key=5e0df12c70fcf9a5b20a2a8dcb956ca1&actionKey=appkey&appkey=27eb53fc9058f8c3&build=3445&device=phone&mobi_app=iphone&page=1&pagesize=100&platform=ios&season_id=5027&sign=6dfbe4193ec84aed0ef3e38d1f810ec4&ts=1468406428",'urlStr');

        }
        return self;
    }

})

defineClass("SWHomeViewController: SWBaseViewController<UITableViewDataSource>", {
    tableView_numberOfRowsInSection: function (tableView, section) {
        if(self.getProp("data").count() > 0){
            return self.getProp("data").count();
        }else{
            return 20;
        }

    },
    tableView_cellForRowAtIndexPath: function (tableView, indexPath) {
        var cell = tableView.dequeueReusableCellWithIdentifier("cell");
        if(self.getProp("data").count() > 0){
            var dict = self.getProp("data").objectAtIndex(indexPath.row());
            cell.installData_indexPath(dict,indexPath);
        }else{
        //    cell.textLabel().setText("春节");
        }
        return cell;
    }
})
defineClass("SWHomeViewController: SWBaseViewController<UITableViewDelegate>", {
    tableView_didSelectRowAtIndexPath: function (tableView, indexPath) {
        tableView.deselectRowAtIndexPath_animated(indexPath,1);
        var vc = require('SWHomeSecondViewController').alloc().init();
        vc.view().setBackgroundColor(UIColor.yellowColor());
        self.navigationController().pushViewController_animated(vc,1);

    }
})
defineClass("SWHomeViewController:SWBaseViewController",{
    lazyImageView:function(){
        var imageView = UIImageView.alloc().initWithFrame({x:0, y:0, width:375, height:UIScreen.mainScreen().bounds().height });
        imageView.setUserInteractionEnabled(1);
        var tap = require('UITapGestureRecognizer').alloc().initWithTarget_action(self,'tapClick:');
        imageView.addGestureRecognizer(tap);
        imageView.setContentMode(1);
        imageView.setBackgroundColor(UIColor.blackColor());
        return imageView;
    }
})


//SW 首页二级页面 的控制器---------------------------//SW 首页二级页面 的控制器---------------------------//SW 首页二级页面 的控制器---------------------------//SW 首页二级页面 的控制器---------------------------

defineClass("SWHomeSecondViewController:SWHomeViewController",{
    lazyImageView:function(){
        var imageView = UIImageView.alloc().initWithFrame({x:0, y:0, width:375, height:UIScreen.mainScreen().bounds().height });
        imageView.setUserInteractionEnabled(1);
        var tap = require('UITapGestureRecognizer').alloc().initWithTarget_action(self,'tapClick:');
        imageView.addGestureRecognizer(tap);
        imageView.setContentMode(1);
        imageView.setBackgroundColor(UIColor.blackColor());
        return imageView;
    }
})
defineClass("SWHomeSecondViewController: SWHomeViewController <UIAlertViewDelegate>", {
    viewDidAppear: function(animated) {
        var alertView = require('UIAlertView')
            .alloc()
            .initWithTitle_message_delegate_cancelButtonTitle_otherButtonTitles(
            "Alert",
            "我是自定义类",
            self,
            "OK",
            null
        )
        alertView.show();
    },
    alertView_clickedButtonAtIndex: function(alertView, buttonIndex) {
        console.log('clicked index ' + buttonIndex)
    }
})

defineClass("SWHomeSecondViewController: SWHomeViewController<UITableViewDelegate>", {
    tableView_didSelectRowAtIndexPath: function (tableView, indexPath) {
        tableView.deselectRowAtIndexPath_animated(indexPath,1);
        console.log(indexPath.row());
        var dict = self.getProp("data").objectAtIndex(indexPath.row());
        var urlStr = dict.objectForKey('face');
        var url = NSURL.URLWithString(urlStr);
        var imageView = self.lazyImageView();
        imageView.sd__setImageWithURL(url);
        self.view().addSubview(imageView);
        //var vc = require('SWViewController').alloc().init();
        //vc.view().setBackgroundColor(UIColor.yellowColor());
        //self.navigationController().pushViewController_animated(vc,1);

    }
})


//自定义cell------------------------//自定义cell------------------------//自定义cell------------------------//自定义cell------------------------//自定义cell------------------------

defineClass("SWTableViewCell: UITableViewCell", {
    dealloc:function(){
        console.log(self.class());
    }
})
defineClass("SWTableViewCell: UITableViewCell",{
    //- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(nullable NSString *)reuseIdentifier
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){

        if(self = self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.configSubview();
        }
        return self;
    }
})
//子控件初始化 数据赋值-------------------------------------

defineClass("SWTableViewCell: UITableViewCell", {
    configSubview:function(){
        var iconImage = UIImageView.alloc().initWithFrame({x:10,y:10,width:60,height:60});
        iconImage.layer().setCornerRadius(30);
        iconImage.setClipsToBounds(1);
        self.contentView().addSubview(iconImage);
        self.setProp_forKey(iconImage,"iconImage");
        var nameLabel = UILabel.alloc().initWithFrame({x:90,y:20,width:200,height:25});
        self.contentView().addSubview(nameLabel);
        self.setProp_forKey(nameLabel,"nameLabel");
        var messageLabel = UILabel.alloc().initWithFrame({x:90,y:40,width:200,height:25});
        self.contentView().addSubview(messageLabel);
        self.setProp_forKey(messageLabel,"messageLabel");
    },
    installData_indexPath:function(dict,indexPath){
        var urlStr = dict.objectForKey('face');
        var name = dict.objectForKey('uname');
        var message = dict.objectForKey('message')
        var url = NSURL.URLWithString(urlStr);
        self.getProp("iconImage").sd__setImageWithURL(url);
        self.getProp("nameLabel").setText(name);
        if(indexPath.row()<3&&indexPath.row()>=0){
            self.getProp("nameLabel").setTextColor(UIColor.colorWithRed_green_blue_alpha(251./255,114./255,153./255,1));
        }else{
            self.getProp("nameLabel").setTextColor(UIColor.blackColor());
        }
        if(!(message.length())){
            self.getProp("messageLabel").setText("没有留言");
        }else{
            self.getProp("messageLabel").setText(message);
        }

    }
})

//SW分区----------------------//SW分区----------------------//SW分区----------------------//SW分区----------------------//SW分区----------------------//SW分区----------------------//SW分区----------

defineClass("SWCategoryController: SWHomeViewController",{
    init:function(){
        if(self.ORIGinit()){
            var normalImage = UIImage.imageNamed("home_category_tab");
            var selectImage = UIImage.imageNamed("home_category_tab_s");
            normalImage = normalImage.imageWithRenderingMode(1);
            selectImage = selectImage.imageWithRenderingMode(1);
            self.tabBarItem().setImage(normalImage);
            self.tabBarItem().setSelectedImage(selectImage);

            self.setProp_forKey("http://bangumi.bilibili.com/sponsor/rank/get_sponsor_total?access_key=5e0df12c70fcf9a5b20a2a8dcb956ca1&actionKey=appkey&appkey=27eb53fc9058f8c3&build=3445&device=phone&mobi_app=iphone&page=1&pagesize=100&platform=ios&season_id=5027&sign=6dfbe4193ec84aed0ef3e38d1f810ec4&ts=1468406428",'urlStr');

        }
        return self;
    }

})

// SW 关注-------------------------// SW 关注-------------------------// SW 关注-------------------------// SW 关注-------------------------// SW 关注-------------------------// SW 关注-------------------------

defineClass("SWConcernViewController: SWHomeViewController",{
    init:function(){
        if(self.ORIGinit()){
            var normalImage = UIImage.imageNamed("home_attention_tab");
            var selectImage = UIImage.imageNamed("home_attention_tab_s");
            normalImage = normalImage.imageWithRenderingMode(1);
            selectImage = selectImage.imageWithRenderingMode(1);
            self.tabBarItem().setImage(normalImage);
            self.tabBarItem().setSelectedImage(selectImage);

            self.setProp_forKey("http://bangumi.bilibili.com/sponsor/rank/get_sponsor_total?access_key=5e0df12c70fcf9a5b20a2a8dcb956ca1&actionKey=appkey&appkey=27eb53fc9058f8c3&build=3445&device=phone&mobi_app=iphone&page=1&pagesize=100&platform=ios&season_id=5027&sign=6dfbe4193ec84aed0ef3e38d1f810ec4&ts=1468406428",'urlStr');

        }
        return self;
    }

})


// SW 发现-------------------------// SW 发现-------------------------// SW 发现-------------------------// SW 发现-------------------------// SW 发现-------------------------// SW 发现-------------------------

defineClass("SWSearchViewController: SWHomeViewController",{
    init:function(){
        if(self.ORIGinit()){
            var normalImage = UIImage.imageNamed("home_discovery_tab");
            var selectImage = UIImage.imageNamed("home_discovery_tab_s");
            normalImage = normalImage.imageWithRenderingMode(1);
            selectImage = selectImage.imageWithRenderingMode(1);
            self.tabBarItem().setImage(normalImage);
            self.tabBarItem().setSelectedImage(selectImage);

            self.setProp_forKey("http://bangumi.bilibili.com/sponsor/rank/get_sponsor_total?access_key=5e0df12c70fcf9a5b20a2a8dcb956ca1&actionKey=appkey&appkey=27eb53fc9058f8c3&build=3445&device=phone&mobi_app=iphone&page=1&pagesize=100&platform=ios&season_id=5027&sign=6dfbe4193ec84aed0ef3e38d1f810ec4&ts=1468406428",'urlStr');

        }
        return self;
    }

})



// SW 我的-------------------------// SW 我的-------------------------// SW 我的-------------------------// SW 我的-------------------------// SW 我的-------------------------// SW 我的-------------------------
defineClass("SWPlayerUserCenterViewController: SWHomeViewController",{
    init:function(){
        if(self.ORIGinit()){
            var normalImage = UIImage.imageNamed("home_mine_tab");
            var selectImage = UIImage.imageNamed("home_mine_tab_s");
            normalImage = normalImage.imageWithRenderingMode(1);
            selectImage = selectImage.imageWithRenderingMode(1);
            self.tabBarItem().setImage(normalImage);
            self.tabBarItem().setSelectedImage(selectImage);

            self.setProp_forKey("http://bangumi.bilibili.com/sponsor/rank/get_sponsor_total?access_key=5e0df12c70fcf9a5b20a2a8dcb956ca1&actionKey=appkey&appkey=27eb53fc9058f8c3&build=3445&device=phone&mobi_app=iphone&page=1&pagesize=100&platform=ios&season_id=5027&sign=6dfbe4193ec84aed0ef3e38d1f810ec4&ts=1468406428",'urlStr');

        }
        return self;
    }

})
