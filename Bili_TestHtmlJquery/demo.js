/**
 * Created by suwei on 16/7/13.
 */
require('UIButton,UIWindow,UIView,UICollectionView,UIPageControl,UICollectionViewFlowLayout,UIFont,NSMutableAttributedString,NSMutableString,UITapGestureRecognizer,SWBaseViewController,NSMutableArray,SWTabBarController,UINavigationController,SWHomeViewController,SWCategoryController,SWConcernViewController,SWSearchViewController,SWPlayerUserCenterViewController,JPViewController,UITabBarController,NSArray,UITableView,UIScreen,UIViewController,AppDelegate, UIImageView, UIImage, UIScreen,UITableViewCell,UILabel, NSURL, NSURLRequest,NSURLConnection,NSOperationQueue');
require('UIColor,NSURLResponse,NSData,NSError,NSIndexPath,NSTimer,NSJSONSerialization,NSDictionary,NSArray, UIViewController,SWTableViewCell');
require('JPEngine').addExtensions(['JPMemory']);
require('SWJSPatchNotSupportTool')
require('SWContainerView,UIScrollView,SWTopBar,SWLabel,SWBannerCollectionView');
require('SWTableView,SWHomeBangumiCell,NSAttributedString,NSTextAttachment,NSDateFormatter,NSDate,NSCalendar');
require('SWHomeBangumiViewController,SWHomeBangumiDidEndCell,SWHomeBangumiNewBangumiLoadCell,SWHomeBangumiNewChangLoadItem,SWHomeBangumiDidEndItem,SWHomeBangumiRecommendCell,SWHomeBangumiUniversalHeadView,UITableViewHeaderFooterView,SWHomeBangumiAllIconImageCell,SWHomeBangumiSmallIconBGView,SWHomeBangumiSmallIconBGViewItem,SWHomeBangumiBigIconBGView,SWHomeBangumiBigIconBGViewItem');
require('SWHomeRecommendViewController,SWHomeRecommendHotRecommendCell,SWHomeRecommendNormalCell,SWHomeRecommendDanmakuItem,SWHomeLiveCell,SWHomeRecommendBottomBannerCell,SWHomeLiveItem,SWHomeRecommendBangumiRecommendItem,SWHomeRecommendBangumiRecommendCell');
require('SWCategoryCell');
//扩展结构体
require('JPEngine').defineStruct({
    "name": "UIEdgeInsets",
    "types": "FFFF",
    "keys": ["top", "left", "bottom", "right"]
})

var mainColor = UIColor.colorWithRed_green_blue_alpha(251./255,114./255,153./255,1);
var normalGrayColor = UIColor.colorWithRed_green_blue_alpha(170./255,170./255,170./255,1);
var bgGrayColor = UIColor.colorWithRed_green_blue_alpha(244./255,244./255,244./255,1);
var bgOtherRedColor = UIColor.colorWithRed_green_blue_alpha(255./255,111./255,111./255,1);
var bgOtherBlueColor = UIColor.colorWithRed_green_blue_alpha(94./255,190./255,255./255,1);
var bgOtherYellowColor = UIColor.colorWithRed_green_blue_alpha(255./255,180./255,0./255,1);
var liveGrayColor = UIColor.colorWithRed_green_blue_alpha(231./255,231./255,231./255,1);

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


defineClass("SWHomeViewController: SWBaseViewController<UITableViewDataSource,UITableViewDelegate>", {
    init:function(){
        if(self.ORIGinit()){
            var normalImage = UIImage.imageNamed("home_home_tab");
            var selectImage = UIImage.imageNamed("home_home_tab_s");
            normalImage = normalImage.imageWithRenderingMode(1);
            selectImage = selectImage.imageWithRenderingMode(1);
            self.setAutomaticallyAdjustsScrollViewInsets(0);
            self.tabBarItem().setImage(normalImage);
            self.tabBarItem().setSelectedImage(selectImage);

            self.setProp_forKey("http://bangumi.bilibili.com/sponsor/rank/get_sponsor_week_list?access_key=5e0df12c70fcf9a5b20a2a8dcb956ca1&actionKey=appkey&appkey=27eb53fc9058f8c3&build=3445&device=phone&mobi_app=iphone&page=1&pagesize=100&platform=ios&season_id=5027&sign=6dfbe4193ec84aed0ef3e38d1f810ec4&ts=1468406428",'urlStr');

        }
        return self;
    },
    viewDidLoad:function(){
        self.super().viewDidLoad();
        button = UIButton.alloc().init();
        self.view().setBackgroundColor(mainColor);
        button.setBackgroundColor(UIColor.redColor());
        button.setFrame({x:20, y:64, width:100, height:100});
        button.addTarget_action_forControlEvents(self,'click:',1<<6);
        button.setTag(1);
        var tableView = UITableView.alloc().initWithFrame(UIScreen.mainScreen().bounds());
        self.view().addSubview(tableView);
        tableView.setRowHeight(80);
        tableView.setDataSource(self);
        tableView.setDelegate(self);
        tableView.registerClass_forCellReuseIdentifier(SWTableViewCell.class(),"cell");
        self.setProp_forKey(tableView,"tableView");
        var sel = self;
        var btn = UIButton.alloc().initWithFrame({x:100, y:100, width:100, height:100});
        self.view().addSubview(btn);
        btn.setBackgroundColor(UIColor.redColor());
        //btn.rac__signalForControlEvents(1 <<  6).subscribeNext(block("id",function(x){
            var contain = SWContainerView.alloc().init();
            sel.setProp_forKey(contain,"contain");
            contain.setFrame(sel.view().bounds());
            var vc1 = SWHomeBangumiViewController.alloc().init();
            vc1.setTitle("直播");
            vc1.view().setBackgroundColor(UIColor.redColor());

            var vc2 = SWHomeRecommendViewController.alloc().init();
            vc2.setTitle("推荐");

            var vc3 = SWHomeBangumiViewController.alloc().init();
            vc3.setTitle("番剧");

        sel.addChildViewController(vc1);
        sel.addChildViewController(vc2);
        sel.addChildViewController(vc3);
            contain.installViewControllers(NSArray.arrayWithObjects(vc1,vc2,vc3,null));
            sel.view().addSubview(contain);
        //}));
        var url= NSURL.URLWithString(self.getProp('urlStr'));
        var request = NSURLRequest.alloc().initWithURL(url);
        NSURLConnection.sendAsynchronousRequest_queue_completionHandler(request,NSOperationQueue.mainQueue(),block("NSURLResponse* ,NSData*, NSError*",function(response,data,error) {
            if(!error){
                var NSJSONReadingMutableContainers = 1 << 0;
                var dict = NSJSONSerialization.JSONObjectWithData_options_error(data,NSJSONReadingMutableContainers,null);
                if(dict.isKindOfClass(NSDictionary.class())){
                    dict = dict.objectForKey('result');
                    var array = dict.objectForKey('list');
                    sel.setProp_forKey(array, "data");
                    var data = sel.getProp("data");
                    tableView.reloadData();
                }
            }else{
                console.log("请求失败");
                console.log(error)
            }

        }));
    },
    viewWillAppear:function(animation){
        self.super().viewWillAppear(animation);
        self.navigationController().setNavigationBarHidden_animated(1,1);

    },
    tableView_didSelectRowAtIndexPath: function (tableView, indexPath) {
        tableView.deselectRowAtIndexPath_animated(indexPath,1);
        var vc = require('SWHomeSecondViewController').alloc().init();
        vc.view().setBackgroundColor(UIColor.yellowColor());
        self.navigationController().pushViewController_animated(vc,1);
    },
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
        }
        return cell;
    },
    lazyImageView:function(){
        var imageView = UIImageView.alloc().initWithFrame({x:0, y:0, width:375, height:UIScreen.mainScreen().bounds().height });
        imageView.setUserInteractionEnabled(1);
        var tap = require('UITapGestureRecognizer').alloc().initWithTarget_action(self,'tapClick:');
        imageView.addGestureRecognizer(tap);
        imageView.setContentMode(1);
        imageView.setBackgroundColor(UIColor.blackColor());
        return imageView;
    },
    viewWillLayoutSubviews:function(){
        self.super().viewWillLayoutSubviews();
        var rect = self.view().bounds();
        var contain = self.getProp("contain");
        contain.setFrame({x:0, y:0, width:rect.width, height:rect.height - 44 });
        var tableView = self.getProp("tableView");
        tableView.setFrame(rect);
    },
    click:function(btn){
        //console.log(btn);
        if(btn.tag() == 1){
            self.view().setBackgroundColor(UIColor.whiteColor());
            button.setBackgroundColor(UIColor.redColor());
            btn.setTag(2);
        }else{
            self.view().setBackgroundColor(UIColor.yellowColor());
            //button.setBackgroundColor(UIColor.blueColor());
            btn.setTag(1);
        }
    },
    tapClick:function(tap){
        tap.view().removeFromSuperview();

    }
})

//
defineClass("SWHomeRecommendViewController: SWBaseViewController<UITableViewDataSource,UITableViewDelegate>", {
    init:function(){
        if(self.ORIGinit()){
            self.setProp_forKey("http://app.bilibili.com/x/v2/show?access_key=d19680b060ef8c0f2fd8db23d6fdc0b5&actionKey=appkey&appkey=27eb53fc9058f8c3&build=3480&channel=appstore&device=phone&mobi_app=iphone&plat=1&platform=ios&sign=35589ce4acc17e8a8095608468ffca0d&ts=1470389813&warm=1","recommendUrl");

        }
        return self;
    },
    viewDidLoad:function(){
        self.super().viewDidLoad();
        self.view().setBackgroundColor(bgGrayColor);

        var tableView = SWTableView.new();
        tableView.setBackgroundColor(bgGrayColor);
        tableView.registerClass_forCellReuseIdentifier(SWHomeRecommendHotRecommendCell.class(),SWHomeRecommendHotRecommendCell.description());
        tableView.registerClass_forCellReuseIdentifier(SWHomeLiveCell.class(),SWHomeLiveCell.description());
        tableView.registerClass_forCellReuseIdentifier(SWHomeRecommendBottomBannerCell.class(),SWHomeRecommendBottomBannerCell.description());
        tableView.registerClass_forCellReuseIdentifier(SWHomeRecommendNormalCell.class(),SWHomeRecommendNormalCell.description());
        tableView.registerClass_forCellReuseIdentifier(SWHomeRecommendBangumiRecommendCell.class(),SWHomeRecommendBangumiRecommendCell.description());
        tableView.registerClass_forHeaderFooterViewReuseIdentifier(SWHomeBangumiUniversalHeadView.class(),SWHomeBangumiUniversalHeadView.description());

        self.view().addSubview(tableView);
        self.setProp_forKey(tableView,"tableView");
        tableView.setDataSource(self);
        tableView.setDelegate(self);
        self.loadAndHandleData();
    },
    loadAndHandleData:function(){
        var url= NSURL.URLWithString(self.getProp('recommendUrl'));
        var request = NSURLRequest.alloc().initWithURL(url);
        var sel = self;
        NSURLConnection.sendAsynchronousRequest_queue_completionHandler(request,NSOperationQueue.mainQueue(),block("NSURLResponse* ,NSData*, NSError*",function(response,data,error) {
            if(!error){
                var totalArray = NSMutableArray.new();
                var NSJSONReadingMutableContainers = 1 << 0;
                var dict = NSJSONSerialization.JSONObjectWithData_options_error(data,NSJSONReadingMutableContainers,null);
                if(dict.isKindOfClass(NSDictionary.class())){
                    var jsonArray = dict.objectForKey("data");
                    if(jsonArray.isKindOfClass(NSArray.class())){
                        if(jsonArray.count() > 0){
                            var firstObject = jsonArray.firstObject();
                            if(firstObject.isKindOfClass(NSDictionary.class())){
                                totalArray.addObject(firstObject);
                                sel.lazyBannerView().installData(firstObject.objectForKey("banner").objectForKey("top"));
                            }
                        }
                        totalArray.addObjectsFromArray(jsonArray);
                        sel.setProp_forKey(totalArray,"totalArray");
                    };
                }
               sel.getProp("tableView").reloadData();
            }else{
                console.log("请求失败");
                console.log(error)
            }

        }));
    },
    viewWillLayoutSubviews:function(){
        self.super().viewWillLayoutSubviews();
        self.getProp("tableView").setFrame(self.view().bounds());
    },

    numberOfSectionsInTableView:function(tableView){
        return self.getProp("totalArray").count();
    },
    tableView_numberOfRowsInSection:function(tableView,section){
        if(section == 0){
            return 0;
        }
        return 1;
    },
    tableView_cellForRowAtIndexPath:function(tableView,indexPath){
        var totalArray = self.getProp("totalArray");
        var model = totalArray.objectAtIndex(indexPath.section());
        var banner = model.objectForKey("banner").objectForKey("bottom");
        if(banner){
            var cell = tableView.dequeueReusableCellWithIdentifier(SWHomeRecommendBottomBannerCell.description());
            if(banner.isKindOfClass(NSArray.class())&& banner.count() > 0){
                cell.installData_banner(model,banner.firstObject());
            }
            return cell;
        }
        if(model.objectForKey("type").isEqualToString("bangumi")){
            var cell = tableView.dequeueReusableCellWithIdentifier(SWHomeRecommendBangumiRecommendCell.description());
            cell.installData(model);
            return cell;
        }
        if(indexPath.section() == 1) {
            var cell = tableView.dequeueReusableCellWithIdentifier(SWHomeRecommendHotRecommendCell.description());
            cell.installData(self.getProp("totalArray").objectAtIndex(indexPath.section()));
            return cell;
        }
        if(indexPath.section() == 2) {
            var cell = tableView.dequeueReusableCellWithIdentifier(SWHomeLiveCell.description());
            cell.installData(self.getProp("totalArray").objectAtIndex(indexPath.section()));
            return cell;
        }
        var cell = tableView.dequeueReusableCellWithIdentifier(SWHomeRecommendNormalCell.description());
        cell.installData(self.getProp("totalArray").objectAtIndex(indexPath.section()));
        return cell;

    },
    tableView_heightForRowAtIndexPath:function(tableView,indexPath){
        var totalArray = self.getProp("totalArray");
        var model = totalArray.objectAtIndex(indexPath.section());
        var banner = model.objectForKey("banner").objectForKey("bottom");
        if(banner){
            return SWHomeRecommendBottomBannerCell.getHeight();
        }
        if(indexPath.section()== 1){
            return SWHomeRecommendHotRecommendCell.getHeight();
        }
        if(indexPath.section()== 2){
            return SWHomeLiveCell.getHeight();
        }
        if(model.objectForKey("type").isEqualToString("bangumi")){
            return SWHomeRecommendBangumiRecommendCell.getHeight();
        }

       return SWHomeRecommendNormalCell.getHeight();
    },
    tableView_viewForHeaderInSection:function(tableView,section){
        if(section != 0){
            var headView = tableView.dequeueReusableHeaderFooterViewWithIdentifier(SWHomeBangumiUniversalHeadView.description());
            var model = self.getProp("totalArray").objectAtIndex(section);
            if(model){
                headView.installModel(model);
            }
            return headView;
        }else{
            return self.lazyBannerView();
        }
    },
    tableView_heightForHeaderInSection:function(tableView,section){
        if(section == 0){
            var rect = UIScreen.mainScreen().bounds();
            var width = rect.width ;
            return width /3.2;
        }
        return 44;
    },
    lazyBannerView:function(){
        if(!self.getProp("bannerView")){
            var bannerView = SWBannerCollectionView.new();
            self.setProp_forKey(bannerView,"bannerView");
        }
        return self.getProp("bannerView");
    }

})

// 首页推荐中 只是简单的带有4个SWHomeRecommendDanmakuItem的item
defineClass("SWHomeRecommendNormalCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier) {

        if (self = self.ORIGinitWithStyle_reuseIdentifier(style, reuseIdentifier)) {
            self.setSelectionStyle(0);

            var itemArray = NSMutableArray.new();

            var itemOne = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemOne);
            itemArray.addObject(itemOne);
            self.setProp_forKey(itemOne,"itemOne");

            var itemTwo = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemTwo);
            itemArray.addObject(itemTwo);
            self.setProp_forKey(itemTwo,"itemTwo");


            var itemThree = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemThree);
            itemArray.addObject(itemThree);
            self.setProp_forKey(itemThree,"itemThree");


            var itemFour = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemFour);
            itemArray.addObject(itemFour);
            self.setProp_forKey(itemFour,"itemFour");

            self.setProp_forKey(itemArray,"itemArray");

        }
        return self;
    },
    installData:function(dict){
        if(!dict){
            return;
        }
        if(!dict.isKindOfClass(NSDictionary.class())){
            return;
        }
        var bodyArray = dict.objectForKey("body");
        if(!bodyArray.isKindOfClass(NSArray.class())){
            return;
        }
        var itemArray = self.getProp("itemArray");
        for(var i = 0; i < itemArray.count(); i++){
            if(i < bodyArray.count()){
                var item = itemArray.objectAtIndex(i);
                var model = bodyArray.objectAtIndex(i);
                var isLast;
                if(i == self.getProp("itemArray").count() - 1){
                    isLast = 1;
                }else{
                    isLast = 0;
                }
                item.installData(model,isLast);
            }
        }
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var width = UIScreen.mainScreen().bounds().width;
        var itemWidth = (width - 3 * margin)/2;
        var height = SWHomeRecommendDanmakuItem.getHeight();
        self.getProp("itemOne").setFrame({x:12, y:0, width:itemWidth, height:height});
        self.getProp("itemTwo").setFrame({x:itemWidth + 2 * margin, y:0, width:itemWidth, height:height});
        self.getProp("itemThree").setFrame({x:12, y:height, width:itemWidth, height:height});
        self.getProp("itemFour").setFrame({x:itemWidth + 2 * margin, y:height, width:itemWidth, height:height});

    }
}, {
    getHeight: function () {
        return SWHomeRecommendDanmakuItem.getHeight() * 2
    }
})
// 首页推荐中带有 4个 SWHomeRecommendDanmakuItem item 底部有一个banner的cell
defineClass("SWHomeRecommendBottomBannerCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){

        if(self = self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.setSelectionStyle(0);

            var itemArray = NSMutableArray.new();

            var itemOne = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemOne);
            itemArray.addObject(itemOne);
            self.setProp_forKey(itemOne,"itemOne");

            var itemTwo = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemTwo);
            itemArray.addObject(itemTwo);
            self.setProp_forKey(itemTwo,"itemTwo");


            var itemThree = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemThree);
            itemArray.addObject(itemThree);
            self.setProp_forKey(itemThree,"itemThree");


            var itemFour = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemFour);
            itemArray.addObject(itemFour);
            self.setProp_forKey(itemFour,"itemFour");

            var bottomBanner = UIImageView.new();
            self.contentView().addSubview(bottomBanner);
            self.setProp_forKey(bottomBanner,"bottomBanner");

            self.setProp_forKey(itemArray,"itemArray");

        }
        return self;
    },
    installData_banner:function(dict,banner){
        if(!dict){
            return;
        }
        if(!dict.isKindOfClass(NSDictionary.class())){
            return;
        }
        var bodyArray = dict.objectForKey("body");
        if(!bodyArray.isKindOfClass(NSArray.class())){
            return;
        }
        var itemArray = self.getProp("itemArray");
        for(var i = 0; i < itemArray.count(); i++){
            if(i < bodyArray.count()){
                var item = itemArray.objectAtIndex(i);
                var model = bodyArray.objectAtIndex(i);
                var isLast;
                if(i == self.getProp("itemArray").count() - 1){
                    isLast = 1;
                }else{
                    isLast = 0;
                }
                item.installData(model,isLast);
            }
        }
        if(banner.isKindOfClass(NSDictionary.class())){
            var image = banner.objectForKey("image");
            self.getProp("bottomBanner").sd__setImageWithURL(NSURL.URLWithString(image));
        }


    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var bannerScale = 3.2;
        var width = UIScreen.mainScreen().bounds().width;
        var itemWidth = (width - 3 * margin)/2;
        var height = SWHomeRecommendDanmakuItem.getHeight();
        self.getProp("itemOne").setFrame({x:12, y:0, width:itemWidth, height:height});
        self.getProp("itemTwo").setFrame({x:itemWidth + 2 * margin, y:0, width:itemWidth, height:height});
        self.getProp("itemThree").setFrame({x:12, y:height, width:itemWidth, height:height});
        self.getProp("itemFour").setFrame({x:itemWidth + 2 * margin, y:height, width:itemWidth, height:height});
        self.getProp("bottomBanner").setFrame({x:0, y:height * 2 + 12, width:width, height:width/3.2});

    }
},{
    getHeight:function(){
        var width = UIScreen.mainScreen().bounds().width;
        var bannerScale = 3.2;
        // 12 为间距
        return SWHomeRecommendDanmakuItem.getHeight() * 2 + 12 + width/bannerScale + 12;
    }

})

// 首页推荐中的番剧推荐cell 里面的item可以继承首页番剧中的Item 重写一些方法就可以了(但是发现视图之间的继承有问题 控制器之间的继承没有问题)
defineClass("SWHomeRecommendBangumiRecommendCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){

        if(self = self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.setSelectionStyle(0);

            var itemArray = NSMutableArray.new();

            var itemOne = SWHomeRecommendBangumiRecommendItem.new();
            self.contentView().addSubview(itemOne);
            itemArray.addObject(itemOne);
            self.setProp_forKey(itemOne,"itemOne");

            var itemTwo = SWHomeRecommendBangumiRecommendItem.new();
            self.contentView().addSubview(itemTwo);
            itemArray.addObject(itemTwo);
            self.setProp_forKey(itemTwo,"itemTwo");


            var itemThree = SWHomeRecommendBangumiRecommendItem.new();
            self.contentView().addSubview(itemThree);
            itemArray.addObject(itemThree);
            self.setProp_forKey(itemThree,"itemThree");


            var itemFour = SWHomeRecommendBangumiRecommendItem.new();
            self.contentView().addSubview(itemFour);
            itemArray.addObject(itemFour);
            self.setProp_forKey(itemFour,"itemFour");


            var timeLineImage = UIImageView.new();
            self.contentView().addSubview(timeLineImage);
            timeLineImage.layer().setCornerRadius(5);
            self.setProp_forKey(timeLineImage,"timeLineImage");
            timeLineImage.setImage(UIImage.imageNamed("hd_home_bangumi_timeline"));
            timeLineImage.setClipsToBounds(1);

            var indexImage = UIImageView.new();
            self.contentView().addSubview(indexImage);
            indexImage.layer().setCornerRadius(5);
            self.setProp_forKey(indexImage,"indexImage");
            indexImage.setImage(UIImage.imageNamed("home_bangumi_category"));
            indexImage.setClipsToBounds(1);


            self.setProp_forKey(itemArray,"itemArray");
        }
        return self;
    },
    installData:function(dict){
    if(!dict){
        return;
    }
    if(!dict.isKindOfClass(NSDictionary.class())){
        return;
    }
    var bodyArray = dict.objectForKey("body");
    if(!bodyArray.isKindOfClass(NSArray.class())){
        return;
    }
    var itemArray = self.getProp("itemArray");
    for(var i = 0; i < itemArray.count(); i++){
        if(i < bodyArray.count()){
            var item = itemArray.objectAtIndex(i);
            var model = bodyArray.objectAtIndex(i);
            var isLast;
            item.installData(model);
        }
    }
},
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var width = UIScreen.mainScreen().bounds().width;
        var itemWidth = (width - 3 * margin)/2;
        var height = SWHomeRecommendBangumiRecommendItem.getHeight();
        self.getProp("itemOne").setFrame({x:12, y:0, width:itemWidth, height:height});
        self.getProp("itemTwo").setFrame({x:itemWidth + 2 * margin, y:0, width:itemWidth, height:height});
        self.getProp("itemThree").setFrame({x:12, y:height + margin, width:itemWidth, height:height});
        self.getProp("itemFour").setFrame({x:itemWidth + 2 * margin, y:height + margin, width:itemWidth, height:height});

        self.getProp("timeLineImage").setFrame({x:12, y:height * 2 + 2 * margin + 12, width:itemWidth, height:itemWidth / 4.56});
        self.getProp("indexImage").setFrame({x:itemWidth + 2 * margin, y:height * 2 + 2 * margin + 12, width:itemWidth, height:itemWidth / 4.56});
    }
}, {
    getHeight: function () {
        var margin = 12;
        var width = UIScreen.mainScreen().bounds().width;
        var itemWidth = (width - 3 * margin) / 2;
        return SWHomeRecommendBangumiRecommendItem.getHeight() * 2 +  3 * margin + itemWidth / 4.56 + margin;
    }
})
defineClass("SWHomeRecommendBangumiRecommendItem:UIView",{
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){

            var coverImage = UIImageView.new();
            self.addSubview(coverImage);
            self.setProp_forKey(coverImage,"coverImage");
            coverImage.layer().setCornerRadius(5);
            coverImage.setClipsToBounds(1);

            var shadowImage = UIImageView.new();
            shadowImage.setImage(UIImage.imageNamed("shadow_1_30_gradual_line"));
            coverImage.addSubview(shadowImage);
            self.setProp_forKey(shadowImage,"shadowImage");

            var titleLabel = SWLabel.new();
            titleLabel.installVerticalAlignment(101);
            self.addSubview(titleLabel);
            titleLabel.setFont(UIFont.systemFontOfSize(14));
            self.setProp_forKey(titleLabel,"titleLabel");
            titleLabel.setNumberOfLines(2);

            var timeLabel = UILabel.new();
            timeLabel.setFont (UIFont.systemFontOfSize(12));
            timeLabel.setTextColor(UIColor.whiteColor());
            coverImage.addSubview(timeLabel);
            self.setProp_forKey(timeLabel,"timeLabel");



        }
        return self;
    },
    installData:function(model){
        if(!model){
            return;
        }
        if(!model.isKindOfClass(NSDictionary.class())){
            return;
        }
        var urlStr = model.objectForKey("cover");
        var title = model.objectForKey("title");

        var newest_ep_index = model.objectForKey("index");
        var last_time = model.objectForKey("mtime");
        var dateFormatter = NSDateFormatter.alloc().init();
        dateFormatter.setDateFormat("yyyy-MM-dd HH:mm:ss.s");
        var date = dateFormatter.dateFromString(last_time);
        var temp = date.timeIntervalSince1970();
        //temp = temp + "";
        //console.log(temp);

        var timeStr = SWHomeRecommendBangumiRecommendItem.handleTimetemp_index(temp,newest_ep_index);
        var url = NSURL.URLWithString(urlStr);
        self.getProp("coverImage").sd__setImageWithURL(url);

        self.getProp("titleLabel").setText(title);
        //coverImage为封面图片高度， 17 为titleLable的高度 6为titleLabel和timeLabel的间距  14.5 为下面的timeLabel的高度 12为底部默认留的间距
        self.getProp("timeLabel").setText(timeStr);

    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var totalWidth = UIScreen.mainScreen().bounds().width;
        var width = (totalWidth - (3 * margin))/2;
        var coverImageScale = 1.57;
        var coverImageHeight = width / coverImageScale;
        self.getProp("coverImage").setFrame({x:0, y:0, width:width, height:coverImageHeight});
        //x减掉80而不是85的原因是想让图片出去一点
        self.getProp("titleLabel").setFrame({x:0, y:coverImageHeight + 6, width:width, height:34});
        //coverImage为封面图片高度， 17 为titleLable的高度 6为titleLabel和timeLabel的间距  14.5 为下面的timeLabel的高度 12为底部默认留的间距
        self.getProp("timeLabel").setFrame({x:6, y:coverImageHeight - 14.5 - 6, width:width, height:14.5});
        self.getProp("shadowImage").setFrame({x:0, y:coverImageHeight - 0.5 * coverImageHeight, width:width, height:0.5 * coverImageHeight});
    }
},{
    getHeight:function(){
        var margin = 12;
        var totalWidth = UIScreen.mainScreen().bounds().width;
        var width = (totalWidth - (3 * margin))/2;
        var coverImageScale = 1.57;
        var coverImageHeight = width / coverImageScale;
        //以后开始写代码这边返回高度只返回它自己本身的高度，不在把间距包含在item内
        return coverImageHeight + 6 + 34 ;
    },
    handleTimetemp_index:function(last_time,new_ep_index){
        var temp = last_time;
        var dateFormatter = NSDateFormatter.alloc().init();
        dateFormatter.setDateFormat("yyyy-MM-dd HH:mm:ss.s");
        var date = NSDate.dateWithTimeIntervalSince1970(temp);
        if (!date) {
            return "";
        }
        var weekDayString = NSArray.arrayWithObjects("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",null);
        var keyOfDayFormater = NSDateFormatter.alloc().init();
        keyOfDayFormater.setDateFormat("yyyy-MM-dd");
        var secondsPerDay = 24 * 60 * 60;
        var todayDate = NSDate.date();
        var yesterdayDate = todayDate.dateByAddingTimeInterval(0 - secondsPerDay);
        //
        var unitFlags = 1 << 2 | 1 << 3 | 1 << 4 | 1 << 5 | 1 << 6 | 1 << 7|1 << 9;
        //
        var canlendar = NSCalendar.currentCalendar();
        var listOfdayComponents = canlendar.components_fromDate(unitFlags,date);
        //

        var hour = listOfdayComponents.hour()<10?"0":"";
        var minute = listOfdayComponents.minute()<10?"0":"";
        var rets = NSMutableString.string();
        //

        if (keyOfDayFormater.stringFromDate(date).isEqualToString(keyOfDayFormater.stringFromDate(todayDate))) {
            if (listOfdayComponents.hour()<6) {
                rets.appendString("凌晨");
            }else if (listOfdayComponents.hour()<12) {
                rets.appendString("上午");
            }else if (listOfdayComponents.hour()<14) {
                rets.appendString("中午");
            }else if (listOfdayComponents.hour()<18) {
                rets.appendString("下午");
            }else{
                rets.appendString("晚上");
            }
        } else if (keyOfDayFormater.stringFromDate(date).isEqualToString(keyOfDayFormater.stringFromDate(yesterdayDate))) {
            rets.appendString("昨天");
        } else {
            rets.appendString(weekDayString.objectAtIndex(listOfdayComponents.weekday()-1));
        }
        //[rets appendString:[NSString stringWithFormat:@"%@%zd:%@%zd",hour,listOfdayComponents.hour,minute,listOfdayComponents.minute]];
        var jsStr =  hour + listOfdayComponents.hour() +":"+ minute + listOfdayComponents.minute() +" · " + "第 " + new_ep_index.toJS() + " 话";
        rets.appendString(jsStr);
        return rets;

    }
})

// 首页推荐中带有 6 个 SWHomeRecommendDanmakuItem item的cell
defineClass("SWHomeRecommendHotRecommendCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){

        if(self = self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.setSelectionStyle(0);
            var itemArray = NSMutableArray.new();

            var itemOne = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemOne);
            itemArray.addObject(itemOne);
            self.setProp_forKey(itemOne,"itemOne");

            var itemTwo = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemTwo);
            itemArray.addObject(itemTwo);
            self.setProp_forKey(itemTwo,"itemTwo");


            var itemThree = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemThree);
            itemArray.addObject(itemThree);
            self.setProp_forKey(itemThree,"itemThree");


            var itemFour = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemFour);
            itemArray.addObject(itemFour);
            self.setProp_forKey(itemFour,"itemFour");


            var itemFive = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemFive);
            itemArray.addObject(itemFive);
            self.setProp_forKey(itemFive,"itemFive");


            var itemSix = SWHomeRecommendDanmakuItem.new();
            self.contentView().addSubview(itemSix);
            itemArray.addObject(itemSix);
            self.setProp_forKey(itemSix,"itemSix");


            self.setProp_forKey(itemArray,"itemArray");
        }
        return self;
    },
    installData:function(dict){
        if(!dict){
            return;
        }
        if(!dict.isKindOfClass(NSDictionary.class())){
            return;
        }
        var bodyArray = dict.objectForKey("body");
        if(!bodyArray.isKindOfClass(NSArray.class())){
            return;
        }
        var itemArray = self.getProp("itemArray");
        for(var i = 0; i < itemArray.count(); i++){
            if(i < bodyArray.count()){
                var item = itemArray.objectAtIndex(i);
                var model = bodyArray.objectAtIndex(i);
                var isLast;
                if(i == self.getProp("itemArray").count() - 1){
                    isLast = 1;
                }else{
                    isLast = 0;
                }
                item.installData(model,isLast);
            }
        }
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var width = UIScreen.mainScreen().bounds().width;
        var itemWidth = (width - 3 * margin)/2;
        var height = SWHomeRecommendDanmakuItem.getHeight();
        self.getProp("itemOne").setFrame({x:12, y:0, width:itemWidth, height:height});
        self.getProp("itemTwo").setFrame({x:itemWidth + 2 * margin, y:0, width:itemWidth, height:height});
        self.getProp("itemThree").setFrame({x:12, y:height, width:itemWidth, height:height});
        self.getProp("itemFour").setFrame({x:itemWidth + 2 * margin, y:height, width:itemWidth, height:height});
        self.getProp("itemFive").setFrame({x:12, y:height * 2, width:itemWidth, height:height});
        self.getProp("itemSix").setFrame({x:itemWidth + 2 * margin, y:height * 2, width:itemWidth, height:height});

    }
},{
    getHeight:function(){
        return SWHomeRecommendDanmakuItem.getHeight() * 3
    }
})
// 推荐中带有 观看次数 和 弹幕数 但是没有圆角头像的item
defineClass("SWHomeRecommendDanmakuItem:UIView",{
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){
            var coverImage = UIImageView.new();
            self.addSubview(coverImage);
            self.setProp_forKey(coverImage,"coverImage");
            coverImage.layer().setCornerRadius(5);
            coverImage.setClipsToBounds(1);

            var shadowImage = UIImageView.new();
            shadowImage.setImage(UIImage.imageNamed("shadow_1_30_gradual_line"));
            coverImage.addSubview(shadowImage);
            self.setProp_forKey(shadowImage,"shadowImage");

            var titleLabel = UILabel.new();
            self.addSubview(titleLabel);
            titleLabel.setFont(UIFont.systemFontOfSize(14));
            self.setProp_forKey(titleLabel,"titleLabel");
            titleLabel.setNumberOfLines(2);

            var watchCountImage = UIImageView.new();
            coverImage.addSubview(watchCountImage);
            watchCountImage.setImage(UIImage.imageNamed("misc_playCount_new"));
            self.setProp_forKey(watchCountImage,"watchCountImage");

            var watchCountLabel = SWLabel.new();
            watchCountLabel.setTextColor(UIColor.whiteColor());
            self.setProp_forKey(watchCountLabel,"watchCountLabel");
            watchCountLabel.setFont(UIFont.systemFontOfSize(12));
            coverImage.addSubview(watchCountLabel);

            var danmakuCountImage = UIImageView.new();
            coverImage.addSubview(danmakuCountImage);
            danmakuCountImage.setImage(UIImage.imageNamed("misc_danmakuCount_new"));
            self.setProp_forKey(danmakuCountImage,"danmakuCountImage");

            var danmakuCountLabel = SWLabel.new();
            danmakuCountLabel.setTextColor(UIColor.whiteColor());
            self.setProp_forKey(danmakuCountLabel,"danmakuCountLabel");
            danmakuCountLabel.setFont(UIFont.systemFontOfSize(12));
            coverImage.addSubview(danmakuCountLabel);

            var refreshImage = UIImageView.new();
            self.addSubview(refreshImage);
            self.setProp_forKey(refreshImage,"refreshImage");
            refreshImage.setImage(UIImage.imageNamed("home_refresh_new"));



        }
        return self;
    },
    installData:function(model,isLast){
        if(!model){
            return;
        }
        if(!model.isKindOfClass(NSDictionary.class())) {
            return;
        }

        self.getProp("coverImage").sd__setImageWithURL(NSURL.URLWithString(model.objectForKey("cover")));
        var titleLabel = self.getProp("titleLabel");
            titleLabel.setText(model.objectForKey("title"));
        var scale = 1.57;
        var margin = 12;
        var width = (UIScreen.mainScreen().bounds().width - 3 * margin)/2;
        var height = width / scale;
        if(isLast){
            self.getProp("refreshImage").setHidden(0);
            self.getProp("titleLabel").setFrame({x:0, y:height + 6, width:width - 68, height:34});

        }else{
            self.getProp("refreshImage").setHidden(1);
            self.getProp("titleLabel").setFrame({x:0, y:height + 6, width:width, height:34});

        }
        var play = model.objectForKey("play");
        var danmaku = model.objectForKey("danmaku");
        if(play > 9999){
            play = (play/10000).toFixed(1) + "万";
        }else{
            play = play + "";
        }
        if(danmaku > 10000){
            danmaku = (danmaku /10000).toFixed(1) + "万";
        }else{
            danmaku = danmaku + "";
        }
        self.getProp("watchCountLabel").setText(play);
        self.getProp("danmakuCountLabel").setText(danmaku);

    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var scale = 1.57;
        var width = (UIScreen.mainScreen().bounds().width - 3 * margin)/2;
        var height = width / scale;
// 6 为小控件之间的间距  14 为小图片的宽度 10为小图片的高度  2.25为因为文字高度要大于小图片高度为了看上去居中 需要将wtchlabel向上移动2.25 14.5为watchLabel的高度  60 为watchLabel的宽度
//        28 为 refresh高度的以titleLabel的Y值为基础像上移动 22 底部漏出去 12
        self.getProp("coverImage").setFrame({x:0, y:0, width:width, height:height});
        self.getProp("watchCountImage").setFrame({x:6, y:height - 6 - 10, width:14, height:10});
        self.getProp("watchCountLabel").setFrame({x:6 + 14 + 6, y:height - 6 - 10 - 2.25, width:60, height:14.5});
        self.getProp("danmakuCountImage").setFrame({x:6 + 14 + 6 + 60, y:height - 6 - 10, width:14, height:10});
        self.getProp("danmakuCountLabel").setFrame({x:6 + 14 + 6 + 60 + 14 + 6, y:height - 6 - 10 - 2.25, width:60, height:14.5});
        self.getProp("shadowImage").setFrame({x:0, y:height - 0.5 * height, width:width, height:0.5 * height});
        self.getProp("refreshImage").setFrame({x:width - 68, y:height + 6 - 22, width:68, height:68});
    }
},{
    getHeight:function(){
        var margin = 12;
        var scale = 1.57;
        var width = (UIScreen.mainScreen().bounds().width - 3 * margin)/2;
        var height = width / scale;
// 6 为小控件之间的间距  34为titlelabel的高度 12 为底部默认间距。

        return height + 6 + 34 + 12;
    }
})

// 首页推荐中的正在直播cell （首页的直播模块中也会用到）。
defineClass("SWHomeLiveCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){

        if(self = self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.setSelectionStyle(0);

            var itemArray = NSMutableArray.new();

            var itemOne = SWHomeLiveItem.new();
            self.contentView().addSubview(itemOne);
            itemArray.addObject(itemOne);
            self.setProp_forKey(itemOne,"itemOne");

            var itemTwo = SWHomeLiveItem.new();
            self.contentView().addSubview(itemTwo);
            itemArray.addObject(itemTwo);
            self.setProp_forKey(itemTwo,"itemTwo");


            var itemThree = SWHomeLiveItem.new();
            self.contentView().addSubview(itemThree);
            itemArray.addObject(itemThree);
            self.setProp_forKey(itemThree,"itemThree");


            var itemFour = SWHomeLiveItem.new();
            self.contentView().addSubview(itemFour);
            itemArray.addObject(itemFour);
            self.setProp_forKey(itemFour,"itemFour");


            self.setProp_forKey(itemArray,"itemArray");
        }
        return self;
    },
    installData:function(dict){
        if(!dict){
            return;
        }
        if(!dict.isKindOfClass(NSDictionary.class())){
            return;
        }
        var bodyArray = dict.objectForKey("body");
        if(!bodyArray.isKindOfClass(NSArray.class())){
            return;
        }
        var itemArray = self.getProp("itemArray");
        for(var i = 0; i < itemArray.count(); i++){
            if(i < bodyArray.count()){
                var item = itemArray.objectAtIndex(i);
                var model = bodyArray.objectAtIndex(i);
                var isLast;
                if(i == self.getProp("itemArray").count() - 1){
                    isLast = 1;
                }else{
                    isLast = 0;
                }
                item.installData(model,isLast);
            }
        }
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var width = UIScreen.mainScreen().bounds().width;
        var itemWidth = (width - 3 * margin)/2;
        var height = SWHomeLiveItem.getHeight();
        self.getProp("itemOne").setFrame({x:12, y:0, width:itemWidth, height:height});
        self.getProp("itemTwo").setFrame({x:itemWidth + 2 * margin, y:0, width:itemWidth, height:height});
        self.getProp("itemThree").setFrame({x:12, y:height, width:itemWidth, height:height});
        self.getProp("itemFour").setFrame({x:itemWidth + 2 * margin, y:height, width:itemWidth, height:height});

    }
},{
    getHeight:function(){
        return SWHomeLiveItem.getHeight() * 2
    }
})
// 直播中带有 带有圆角头像的item （首页推荐中会用 直播中也会用）
defineClass("SWHomeLiveItem:UIView",{
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){

            var coverImage = UIImageView.new();
            self.addSubview(coverImage);
            self.setProp_forKey(coverImage,"coverImage");
            coverImage.layer().setCornerRadius(5);
            coverImage.setClipsToBounds(1);

            var nameLabel = UILabel.new();
            self.addSubview(nameLabel);
            nameLabel.setFont(UIFont.systemFontOfSize(14));
            self.setProp_forKey(nameLabel,"nameLabel");

            var titleLabel = UILabel.new();
            self.addSubview(titleLabel);
            titleLabel.setFont(UIFont.systemFontOfSize(12));
            titleLabel.setTextColor(normalGrayColor);
            self.setProp_forKey(titleLabel,"titleLabel");
//            titleLabel.setNumberOfLines(2);

            var iconImage = UIImageView.new();
            self.addSubview(iconImage);
            self.setProp_forKey(iconImage,"iconImage");
            iconImage.layer().setCornerRadius(25);
            iconImage.setClipsToBounds(1);

            var watchCountLabel = SWLabel.new();
            watchCountLabel.setTextAlignment(1);
            watchCountLabel.layer().setCornerRadius(3);
            watchCountLabel.setClipsToBounds(1);
            watchCountLabel.installVerticalAlignment(103);
            watchCountLabel.setBackgroundColor(liveGrayColor);
            watchCountLabel.setTextColor(UIColor.blackColor());
            self.setProp_forKey(watchCountLabel,"watchCountLabel");
            watchCountLabel.setFont(UIFont.systemFontOfSize(12));
            self.addSubview(watchCountLabel);

            var refreshImage = UIImageView.new();
            self.addSubview(refreshImage);
            self.setProp_forKey(refreshImage,"refreshImage");
            refreshImage.setImage(UIImage.imageNamed("home_refresh_new"));

        }
        return self;
    },
    installData:function(model,isLast){
      if(!model){
          return;
      }
      if(!model.isKindOfClass(NSDictionary.class())){
            return;
      }
        self.getProp("coverImage").sd__setImageWithURL(NSURL.URLWithString(model.objectForKey("cover")));
        self.getProp("iconImage").sd__setImageWithURL(NSURL.URLWithString(model.objectForKey("face")));
        var titleLabel = self.getProp("titleLabel");
        var nameLabel = self.getProp("nameLabel");
        titleLabel.setText(model.objectForKey("title"));
        nameLabel.setText(model.objectForKey("name"));
        var scale = 1.57;
        var margin = 12;
        var width = (UIScreen.mainScreen().bounds().width - 3 * margin)/2;
        var height = width / scale;
        if(isLast){
            self.getProp("refreshImage").setHidden(0);
//            6.5为本身应该是6，是为了使titleLabel和watchLabel看上去是对齐而向下移0.5。
            self.getProp("titleLabel").setFrame({x:6 + 50 + 6, y:height + 6 + 17 + 6.5 , width:width - 6 - 50 - 6 - 60, height:14.5});

        }else{
            self.getProp("refreshImage").setHidden(1);
            self.getProp("titleLabel").setFrame({x:6 + 50 + 6, y:height + 6 + 17 + 6.5 , width:width - 6 - 50 - 6 , height:14.5});

        }
        var online = model.objectForKey("online");
        if(online > 9999){
            online = (online/10000).toFixed(1) + "万";
        }else{
            online = online + "";
        }

        self.getProp("watchCountLabel").setText(online);

    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var scale = 1.57;
        var width = (UIScreen.mainScreen().bounds().width - 3 * margin)/2;
        var height = width / scale;
// 6 为小控件之间的间距  14 为小图片的宽度 25为头像的高度的一半，50为头像的高度  watchLabel的高度15.5为因为文字高度本身为14.5为了使图片看上去是上下都有一点间距因此加了1的高度 14.5为watchLabel的高度  17 为labelLabel的高度
//        6.5为本身应该是6，是为了使titleLabel和watchLabel看上去是对齐而向下移动了0.5。 17.5为使刷图片在最下方漏出去12的高度计算出来的
        self.getProp("coverImage").setFrame({x:0, y:0, width:width, height:height});
        self.getProp("iconImage").setFrame({x:6, y:height - 25, width:50, height:50});
        self.getProp("watchCountLabel").setFrame({x:6, y:height + 6 + 17 + 6, width:50, height:15.5});
        self.getProp("nameLabel").setFrame({x:6 + 50 + 6, y:height + 6, width:width - 6 - 50 - 6, height:17});
        self.getProp("refreshImage").setFrame({x:width - 68, y:height + 6 - 18.5, width:68, height:68});
    }
},{
    getHeight:function(){
        var margin = 12;
        var scale = 1.57;
        var width = (UIScreen.mainScreen().bounds().width - 3 * margin)/2;
        var height = width / scale;

// 6 为小控件之间的间距  ，  watchLabel的高度15.5为因为文字高度本身为14.5为了使图片看上去是上下都有一点间距因此加了1的高度   17 为labelLabel的高度
//        6.5为本身应该是6，是为了使titleLabel和watchLabel看上去是对齐的。
        return height + 6 + 17 + 6 + 15.5 + 12;
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
//子控件初始化 SWTableViewCell    SWTableViewCell 数据赋值-------------------------------------

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
        var message = dict.objectForKey('message');
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


//SW 首页番剧页面
defineClass("SWHomeBangumiViewController:SWBaseViewController<UITableViewDataSource,UITableViewDelegate>",{
    init:function(){
        if(self.ORIGinit()){
            self.setProp_forKey("http://bangumi.bilibili.com/api/app_index_page_v3?actionKey=appkey&appkey=27eb53fc9058f8c3&build=3431&device=phone&mobi_app=iphone&platform=ios&sign=8344bb7cee65b65db06625379578aaf5&ts=1469931813","urlStr");
            self.setProp_forKey("http://bangumi.bilibili.com/api/bangumi_recommend?actionKey=appkey&appkey=27eb53fc9058f8c3&build=3431&cursor=0&device=phone&mobi_app=iphone&pagesize=10&platform=ios&sign=25e11a7b34c5e8fa943e359f03340f82&ts=1469931987","recommendUrlStr");
        }
        return self;
    },
    viewDidLoad:function(){
        self.super().viewDidLoad();
        self.view().setBackgroundColor(bgGrayColor);
        var tableView = SWTableView.alloc().initWithFrame(self.view().bounds());
        tableView.setBackgroundColor(bgGrayColor);
        self.view().addSubview(tableView);
        self.setProp_forKey(tableView,"tableView");
        tableView.registerClass_forCellReuseIdentifier(SWHomeBangumiNewBangumiLoadCell.class(),SWHomeBangumiNewBangumiLoadCell.description());
        tableView.registerClass_forCellReuseIdentifier(SWHomeBangumiDidEndCell.class(),SWHomeBangumiDidEndCell.description());
        tableView.registerClass_forCellReuseIdentifier(SWHomeBangumiRecommendCell.class(),SWHomeBangumiRecommendCell.description());
        tableView.registerClass_forHeaderFooterViewReuseIdentifier(SWHomeBangumiUniversalHeadView.class(),SWHomeBangumiUniversalHeadView.description());
        tableView.registerClass_forCellReuseIdentifier(SWHomeBangumiAllIconImageCell.class(),SWHomeBangumiAllIconImageCell.description());


        tableView.setDataSource(self);
        tableView.setDelegate(self);
        self.loadAndHandleData();
    },
    //datasource and delegate
    numberOfSectionsInTableView:function(tableView){
        return self.getProp("totalArray").count();
    },
    tableView_numberOfRowsInSection:function(tableView,section){
        if(section == 3){
            return self.getProp("totalArray").objectAtIndex(section).count();
        }else{
            return 1;
        }
    },
    tableView_cellForRowAtIndexPath:function(tableView,indexPath){
        if(indexPath.section() == 1){
            var cell = tableView.dequeueReusableCellWithIdentifier(SWHomeBangumiNewBangumiLoadCell.description());
            cell.installData(self.getProp("totalArray").objectAtIndex(indexPath.section()));
            return cell;
        }else if(indexPath.section() == 2){
            var cell = tableView.dequeueReusableCellWithIdentifier(SWHomeBangumiDidEndCell.description());
            //如果为了解决重影可以直接在此处不去重用cell，直接每次都重新创建
            //var cell = SWHomeBangumiDidEndCell.alloc().initWithStyle_reuseIdentifier(0,SWHomeBangumiDidEndCell.description());
            cell.installData(self.getProp("totalArray").objectAtIndex(indexPath.section()));
            return cell;
        }else if(indexPath.section() == 3){
            var recommendArray = self.getProp("totalArray").objectAtIndex(indexPath.section());
            var model;
            if(indexPath.row() < recommendArray.count()){
                model = recommendArray.objectAtIndex(indexPath.row());
            }
            var cell = tableView.dequeueReusableCellWithIdentifier(SWHomeBangumiRecommendCell.description());

            cell.installData(model);
            return cell;
        }
        return tableView.dequeueReusableCellWithIdentifier(SWHomeBangumiAllIconImageCell.description());;
    },
    tableView_heightForRowAtIndexPath:function(tableView,indexPath){
        if(indexPath.section() == 1){
          return SWHomeBangumiNewBangumiLoadCell.getHeight();
        }else if(indexPath.section() == 2){
            return SWHomeBangumiDidEndCell.getHeight();
        }else if(indexPath.section()== 3){
            var recommendArray = self.getProp("totalArray").objectAtIndex(indexPath.section());
            var model;
            if(indexPath.row() < recommendArray.count()){
                model = recommendArray.objectAtIndex(indexPath.row());
            }
            return SWHomeBangumiRecommendCell.getHeight(model.objectForKey("desc"));
        }else{
            return SWHomeBangumiAllIconImageCell.getHeight();
        }
    },
    tableView_viewForHeaderInSection:function(tableView,section){
        if(section != 0){
            var headView = tableView.dequeueReusableHeaderFooterViewWithIdentifier(SWHomeBangumiUniversalHeadView.description());
            var dict = self.getProp("dictArray").objectAtIndex(section);
            if(dict){
                headView.installData_section(dict,section);
            }
            return headView;
        }else{
            return self.lazyBannerView();
        }
    },
    tableView_heightForHeaderInSection:function(tableView,section){
        if(section == 0){
           var rect = UIScreen.mainScreen().bounds();
           var width = rect.width ;
            return width /3.2;
        }
        return 44;
    },
    //屏幕即将旋转方法重写
    //willAnimateRotationToInterfaceOrientation_duration:function(toInterfaceOrienation,duration){
    //    self.lazyBannerView().refreshLayout();
    //},
    //用上面的方法接受屏幕旋转通知，会导致系统警告（原因未知）
    willRotateToInterfaceOrientation_duration:function(toInterfaceOrienation,duration){
       self.lazyBannerView().refreshLayout();
    },
    scrollViewDidScroll:function(scrollView){
    },
    viewWillLayoutSubviews:function(){
      self.super().viewWillLayoutSubviews();
        var tableView = self.getProp("tableView")
        tableView.setFrame(self.view().bounds());
        var width= self.view().bounds().width
        //self.lazyBannerView().setFrame({x:0, y:0, width:width , height:width/3.2});
    },
    lazyBannerView:function(){
        if(!self.getProp("bannerView")){
            var bannerView = SWBannerCollectionView.new();
            self.setProp_forKey(bannerView,"bannerView");
        }
        return self.getProp("bannerView");
    },
    loadAndHandleData:function(){
        var url= NSURL.URLWithString(self.getProp('urlStr'));
        var request = NSURLRequest.alloc().initWithURL(url);
        var sel = self;
        NSURLConnection.sendAsynchronousRequest_queue_completionHandler(request,NSOperationQueue.mainQueue(),block("NSURLResponse* ,NSData*, NSError*",function(response,data,error) {
            if(!error){

                var totalArray = NSMutableArray.new();
                var NSJSONReadingMutableContainers = 1 << 0;
                var dict = NSJSONSerialization.JSONObjectWithData_options_error(data,NSJSONReadingMutableContainers,null);
                //番剧连载
                if(dict.isKindOfClass(NSDictionary.class())){
                    var listArray= dict.objectForKey("result").objectForKey("latestUpdate").objectForKey("list");
                    //banner 封面
                    var bannersArray = dict.objectForKey("result").objectForKey("banners");
                    //完结动画
                    var endsArray = dict.objectForKey("result").objectForKey("ends");
                    totalArray.addObject(bannersArray);
                    totalArray.addObject(listArray);
                    totalArray.addObject(endsArray);
                    sel.setProp_forKey(totalArray,"totalArray");
//                console.log(sel.bannerView());
                    sel.lazyBannerView().installData(bannersArray);
                    sel.setProp_forKey(dict.objectForKey("result").objectForKey("latestUpdate").objectForKey("updateCount"),"updateCount");
                    var dictArray = NSArray.arrayWithObjects({"imageName":" ","title":" ","count":" ","desc":" "},
                        {"imageName":"hd_bangumi_unfinished","title":"新番连载","desc":"今日更新","count":sel.getProp("updateCount")},
                        {"imageName":"hd_bangumi_finished","title":"完结动画","desc":"进去看看","count":" "},
                        {"imageName":"recommend_compressed","title":"番剧推荐","count":" ","desc":" "},null);
//               JSPatch 支持原生数组 字典 表达方式和OC的区别就是不需要@符号
//                  var dictArray = [{"imageName":" ","title":" ","count":" ","desc":" "},
//                                 {"imageName":"hd_bangumi_unfinished","title":"新番连载","desc":"今日更新","desc":"今日更新","count":sel.getProp("updateCount")},
//                                {"imageName":"hd_bangumi_finished","title":"完结动画","desc":"进去看看","count":" "},
//                                {"imageName":"热门推荐","title":"番剧推荐","count":" ","desc":" "}];
                    sel.setProp_forKey(dictArray,"dictArray");
                }

                sel.getProp("tableView").reloadData();
                sel.loadRecommendData();
            }else{
                console.log("请求失败");
                console.log(error)
            }

        }));
    },
    loadRecommendData:function(){
        //        现在JSPatch除了不支持 动态调用C函数 和 一些特殊结构体之外，几乎什么都支持了。
        var sel = self;
        var recommendUrl= NSURL.URLWithString(sel.getProp('recommendUrlStr'));
        var request = NSURLRequest.alloc().initWithURL(recommendUrl);
        NSURLConnection.sendAsynchronousRequest_queue_completionHandler(request,NSOperationQueue.mainQueue(),block("NSURLResponse* ,NSData*, NSError*",function(response,data,error) {
            if(!error){
                var NSJSONReadingMutableContainers = 1 << 0;
                var dict = NSJSONSerialization.JSONObjectWithData_options_error(data,NSJSONReadingMutableContainers,null);
                //番剧推荐
                if(dict.isKindOfClass(NSDictionary.class())){
                    var recommendArray= dict.objectForKey("result");
                    if(recommendArray){
                        sel.getProp("totalArray").addObject(recommendArray);
                        sel.getProp("tableView").reloadData();
                    }
                }
            }else{
                console.log("请求失败");
                console.log(error)
            }
        }));
    }
})
//SW 首页番剧中 全是图标的cell
defineClass("SWHomeBangumiAllIconImageCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){
        if(self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.setSelectionStyle(0);
            var smallIconBGView = SWHomeBangumiSmallIconBGView.new();
            self.contentView().addSubview(smallIconBGView);
            self.setProp_forKey(smallIconBGView,"smallIconBGView");

            var bigIconBGView = SWHomeBangumiBigIconBGView.new();
            self.contentView().addSubview(bigIconBGView);
            self.setProp_forKey(bigIconBGView,"bigIconBGView");
        }
        return self;
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var rect = self.bounds();
        self.getProp("smallIconBGView").setFrame({x:0, y:0, width:rect.width, height:95});
        self.getProp("bigIconBGView").setFrame({x:0, y:95, width:rect.width, height:50});

    }
},{
    getHeight:function(){
        var scale = 2.1;
        var margin = 12;
        var width = (UIScreen.mainScreen().bounds().width - 4 * margin)/3;
        return 95 + width/scale;
    }
})

//有 4个 图标
defineClass("SWHomeBangumiSmallIconBGView:UIView",{
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){
            var loadIcon = SWHomeBangumiSmallIconBGViewItem.new();
            self.addSubview(loadIcon);
            loadIcon.installImage_title("hd_bangumi_unfinished","连载动画");
            self.setProp_forKey(loadIcon,"loadIcon");
            var endIcon = SWHomeBangumiSmallIconBGViewItem.new();
            endIcon.installImage_title("hd_bangumi_finished","完结动画");
            self.addSubview(endIcon);
            self.setProp_forKey(endIcon,"endIcon");
            var chinaIcon = SWHomeBangumiSmallIconBGViewItem.new();
            chinaIcon.installImage_title("科技_60.compressed","国产动画");
            self.addSubview(chinaIcon);
            self.setProp_forKey(chinaIcon,"chinaIcon");
            var officerIcon = SWHomeBangumiSmallIconBGViewItem.new();
            officerIcon.installImage_title("番剧_60.compressed","官方延伸");
            self.addSubview(officerIcon);
            self.setProp_forKey(officerIcon,"officerIcon");
        }
        return self;
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 25;
        var bothSideMargin = 18;
        var width = (self.bounds().width -  margin * 3 - 2 * bothSideMargin) / 4;
        self.getProp("loadIcon").setFrame({x:bothSideMargin, y:12.5, width:width, height:70});
        self.getProp("endIcon").setFrame({x:width + bothSideMargin + margin, y:12.5, width:width, height:70});
        self.getProp("chinaIcon").setFrame({x:width *2 + margin * 2 + bothSideMargin, y:12.5, width:width, height:70});
        self.getProp("officerIcon").setFrame({x:width * 3 + margin * 3 + bothSideMargin, y:12.5, width:width, height:70});

    }
})
//有 4 个图标对应的item
defineClass("SWHomeBangumiSmallIconBGViewItem:UIView",{
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){

            var picImage =  UIImageView.new();
            self.addSubview(picImage);
            picImage.setImage(UIImage.imageNamed("hd_bangumi_unfinished"));
            self.setProp_forKey(picImage,"picImage");

            var titleLabel =  UILabel.new();
            titleLabel.setFont(UIFont.systemFontOfSize(12));
            titleLabel.setTextAlignment(1);
            self.addSubview(titleLabel);
            self.setProp_forKey(titleLabel,"titleLabel");
        }
        return self;
    },
    installImage_title:function(image,title){
        self.getProp("picImage").setImage(UIImage.imageNamed(image));
        self.getProp("titleLabel").setText(title);
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var height = self.bounds().height;
        var width = self.bounds().width;
        self.getProp("picImage").setFrame({x:(width - 40)/2, y:height - 20 - 40, width:40, height:40});
        self.getProp("titleLabel").setFrame({x:0, y:height - 20, width:width, height:20});
    }
})

//有 3 个图标
defineClass("SWHomeBangumiBigIconBGView:UIView",{
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){
            var followIcon = SWHomeBangumiBigIconBGViewItem.new();
            followIcon.setBackgroundColor(bgOtherYellowColor);
            self.addSubview(followIcon);
            followIcon.installImage_title("home_bangumi_tableHead_followIcon","home_bangumi_tableHead_followStr");
            self.setProp_forKey(followIcon,"followIcon");

            var timeLineIcon = SWHomeBangumiBigIconBGViewItem.new();
            timeLineIcon.installImage_title("home_bangumi_tableHead_week2","home_bangumi_tableHead_timeList");
            timeLineIcon.setBackgroundColor(bgOtherRedColor);
            self.addSubview(timeLineIcon);
            self.setProp_forKey(timeLineIcon,"timeLineIcon");

            var indexIcon = SWHomeBangumiBigIconBGViewItem.new();
            indexIcon.installImage_title("home_bangumi_tableHead_indexIcon","home_bangumi_tableHead_indexStr");
            indexIcon.setBackgroundColor(bgOtherBlueColor);
            self.addSubview(indexIcon);
            self.setProp_forKey(indexIcon,"indexIcon");
        }
        return self;
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var scale = 2.1;
        var margin = 12;
        var width = (self.bounds().width - 4 * margin)/3;
        self.getProp("followIcon").setFrame({x:12, y:0, width:width, height:width/scale});
        self.getProp("timeLineIcon").setFrame({x:width + 2 * margin, y:0, width:width, height:width/scale});
        self.getProp("indexIcon").setFrame({x:2 * width + 3 * margin, y:0, width:width, height:width/scale});

    }
})
//有 3 个图标对应的item
defineClass("SWHomeBangumiBigIconBGViewItem:UIView",{
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){
            self.layer().setCornerRadius(5);
            self.setClipsToBounds(1);
            var picImage =  UIImageView.new();
            self.addSubview(picImage);
            self.setProp_forKey(picImage,"picImage");

            var titleImage =  UIImageView.new();
            self.addSubview(titleImage);
            self.setProp_forKey(titleImage,"titleImage");


        }
        return self;
    },installImage_title:function(image,title){
        self.getProp("picImage").setImage(UIImage.imageNamed(image));
        self.getProp("titleImage").setImage(UIImage.imageNamed(title));
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var width = self.bounds().width;
        var height = self.bounds().height;
        var scaleWidth = UIScreen.mainScreen().bounds().width
        var scaleHeight = UIScreen.mainScreen().bounds().height
        var scale;
        if(scaleWidth < scaleHeight){
           scale = scaleWidth/375;
        }else{
            scale = scaleHeight/375;
        }

        self.getProp("picImage").setFrame({x:6, y:(height - 44)/2, width:47 * scale, height:44 * scale});
        self.getProp("titleImage").setFrame({x:width - 48 * scale - 5, y:(height - 16)/2, width:47.5 * scale, height:16});

    }
})


//SW 首页番剧页面中子控件
//头部无限轮播控件(尽量封装减少耦合性，因为有很多别的地方会用到)
defineClass("SWCircleView:UIView",{

})
//SW 首页番剧中 带有6个item的新番连载自定义视图  新番连载视图
defineClass("SWHomeBangumiNewBangumiLoadCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){
        if(self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.contentView().setBackgroundColor(UIColor.whiteColor());
            self.setSelectionStyle(0);
            var itemArray = NSMutableArray.new();
            var itemOne = SWHomeBangumiNewChangLoadItem.new();
            itemArray.addObject(itemOne);
            self.setProp_forKey(itemOne,"itemOne");
            self.contentView().addSubview(itemOne);

            var itemTwo = SWHomeBangumiNewChangLoadItem.new();
            itemArray.addObject(itemTwo);
            self.setProp_forKey(itemTwo,"itemTwo");
            self.contentView().addSubview(itemTwo);

            var itemThree = SWHomeBangumiNewChangLoadItem.new();
            itemArray.addObject(itemThree);
            self.setProp_forKey(itemThree,"itemThree");
            self.contentView().addSubview(itemThree);

            var itemFour = SWHomeBangumiNewChangLoadItem.new();
            itemArray.addObject(itemFour);
            self.setProp_forKey(itemFour,"itemFour");
            self.contentView().addSubview(itemFour);

            var itemFive = SWHomeBangumiNewChangLoadItem.new();
            itemArray.addObject(itemFive);
            self.setProp_forKey(itemFive,"itemFive");
            self.contentView().addSubview(itemFive);

            var itemSix = SWHomeBangumiNewChangLoadItem.new();
            itemArray.addObject(itemSix);
            self.setProp_forKey(itemSix,"itemSix");
            self.contentView().addSubview(itemSix);

            self.setProp_forKey(itemArray,"itemArray");


        }
        return self;
    },
        installData:function(array){
            if(array.count() <= 0){
                return;
            }
            var itemArray = self.getProp("itemArray")
            for(var i =0; i < itemArray.count(); i++){
                var item = itemArray.objectAtIndex(i);
                if(i < array.count()){
                    var model = array.objectAtIndex(i);
                    item.installData(model);
                }
            }
        },

        layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var totalWidth = UIScreen.mainScreen().bounds().width;
        var width = (totalWidth - (3 * margin))/2;
        var coverImageScale = 108/174;
        var coverImageHeight = width * coverImageScale;
        //coverImage为封面图片高度， 17 为titleLable的高度  14.5 为下面的timeLabel(显示更新时间 和 第几话的label)的高度 12为底部默认留的间距 还有1个12为title和time的间距
        var itemHeight = coverImageHeight + 17 + 12 + 14.5 + 12;
        //偶数item的x值
        var evenX = totalWidth - width - margin;

             self.getProp("itemOne").setFrame({x:12, y:0, width:width, height:itemHeight});
             self.getProp("itemTwo").setFrame({x:evenX, y:0, width:width, height:itemHeight});
             self.getProp("itemThree").setFrame({x:12, y:itemHeight , width:width, height:itemHeight});
             self.getProp("itemFour").setFrame({x:evenX, y:itemHeight , width:width, height:itemHeight});
             self.getProp("itemFive").setFrame({x:12, y:itemHeight  * 2, width:width, height:itemHeight});
             self.getProp("itemSix").setFrame({x:evenX, y:itemHeight * 2, width:width, height:itemHeight});

    }
},
    {
        getHeight:function(){
            return SWHomeBangumiNewChangLoadItem.getHeight() * 3;
        }
    })
//SW 首页番剧中watchCount 的item  新番连载视图中的item
defineClass("SWHomeBangumiNewChangLoadItem:UIView",{
    init:function(){
      if(self.ORIGinit()){
        var coverImage = UIImageView.new();
          self.addSubview(coverImage);
          coverImage.layer().setCornerRadius(5);
          coverImage.setClipsToBounds(1);
          self.setProp_forKey(coverImage,"coverImage");

          var watchBGimageView = UIImageView.new();
          self.addSubview(watchBGimageView);
          self.setProp_forKey(watchBGimageView,"watchBGimageView");

          var watchCountLabel = SWLabel.new();
          watchCountLabel.installVerticalAlignment(103);
          watchBGimageView.addSubview(watchCountLabel);
          watchCountLabel.setFont (UIFont.systemFontOfSize(12));
          watchCountLabel.setTextAlignment(1);
          self.setProp_forKey(watchCountLabel,"watchCountLabel");

          var titleLabel = UILabel.new();
          titleLabel.setFont (UIFont.systemFontOfSize(13));
          self.addSubview(titleLabel);
          self.setProp_forKey(titleLabel,"titleLabel");

          var timeLabel = UILabel.new();
          timeLabel.setFont (UIFont.systemFontOfSize(12));
          timeLabel.setTextColor(mainColor);
          self.addSubview(timeLabel);
          self.setProp_forKey(timeLabel,"timeLabel");
      }
        return self;
    },
    installData:function(model){
        if(!model){
            return;
        }
        if(!model.isKindOfClass(NSDictionary.class())){
            return;
        }
        var urlStr = model.objectForKey("cover");
        var title = model.objectForKey("title");
        var timeStr = SWHomeBangumiNewChangLoadItem.handleTimetemp_index(model.objectForKey("last_time"),model.objectForKey("newest_ep_index"));
        var url = NSURL.URLWithString(urlStr);
        self.getProp("coverImage").sd__setImageWithURL(url);
        var watchingCount = model.objectForKey("watchingCount").integerValue();
        if(watchingCount > 8000){
            self.getProp("watchBGimageView").setImage(UIImage.imageNamed("watching_tag"));
        }else{
            if(watchingCount <= 10){
                self.getProp("watchBGimageView").setHidden(1);
            }
            self.getProp("watchBGimageView").setImage(UIImage.imageNamed("watching_tag_black"));
        }
        if(watchingCount > 9999){
            var tempWatch = watchingCount/10000
            self.getProp("watchCountLabel").setText(tempWatch.toFixed(2) + "万人在看");
        }else{
            self.getProp("watchCountLabel").setText(watchingCount + "人在看");
        }

        self.getProp("titleLabel").setText(title);
        //coverImage为封面图片高度， 17 为titleLable的高度 6为titleLabel和timeLabel的间距  14.5 为下面的timeLabel的高度 12为底部默认留的间距
        self.getProp("timeLabel").setText(timeStr);

    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var margin = 12;
        var totalWidth = UIScreen.mainScreen().bounds().width;
        var width = (totalWidth - (3 * margin))/2;
        var coverImageScale = 108/174;
        var coverImageHeight = width * coverImageScale;
        self.getProp("coverImage").setFrame({x:0, y:0, width:width, height:coverImageHeight});
        //x减掉80而不是85的原因是想让图片出去一点
        self.getProp("watchBGimageView").setFrame({x:width - 80, y:6, width:85, height:85/3.14});
        self.getProp("watchCountLabel").setFrame(self.getProp("watchBGimageView").bounds());
        self.getProp("titleLabel").setFrame({x:0, y:coverImageHeight + 6, width:width, height:17});
        //coverImage为封面图片高度， 17 为titleLable的高度 6为titleLabel和timeLabel的间距  14.5 为下面的timeLabel的高度 12为底部默认留的间距
        self.getProp("timeLabel").setFrame({x:0, y:coverImageHeight + 6 + 17 + 12, width:width, height:14.5});
    }

},{
    getHeight:function(){
        var margin = 12;
        var totalWidth = UIScreen.mainScreen().bounds().width;
        var width = (totalWidth - (3 * margin))/2;
        var coverImageScale = 108/174;
        var coverImageHeight = width * coverImageScale;
        //coverImage为封面图片高度， 17 为titleLable的高度 6为titleLabel和timeLabel的间距  14.5 为下面的timeLabel的高度 12为底部默认留的间距
        var itemHeight = coverImageHeight + 17 + 12 + 14.5 + 6 + 12;
        return itemHeight;
    },
    handleTimetemp_index:function(last_time,new_ep_index){
        var temp = last_time.integerValue();
        var dateFormatter = NSDateFormatter.alloc().init();
        dateFormatter.setDateFormat("yyyy-MM-dd HH:mm:ss.s");
        var date = NSDate.dateWithTimeIntervalSince1970(temp);
        if (!date) {
            return "";
        }
        var weekDayString = NSArray.arrayWithObjects("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六",null);
        var keyOfDayFormater = NSDateFormatter.alloc().init();
        keyOfDayFormater.setDateFormat("yyyy-MM-dd");
        var secondsPerDay = 24 * 60 * 60;
        var todayDate = NSDate.date();
        var yesterdayDate = todayDate.dateByAddingTimeInterval(0 - secondsPerDay);
        //
        var unitFlags = 1 << 2 | 1 << 3 | 1 << 4 | 1 << 5 | 1 << 6 | 1 << 7|1 << 9;
        //
        var canlendar = NSCalendar.currentCalendar();
        var listOfdayComponents = canlendar.components_fromDate(unitFlags,date);
        //

        var hour = listOfdayComponents.hour()<10?"0":"";
        var minute = listOfdayComponents.minute()<10?"0":"";
        var rets = NSMutableString.string();
        //

        if (keyOfDayFormater.stringFromDate(date).isEqualToString(keyOfDayFormater.stringFromDate(todayDate))) {
            if (listOfdayComponents.hour()<6) {
                rets.appendString("凌晨");
            }else if (listOfdayComponents.hour()<12) {
                rets.appendString("上午");
            }else if (listOfdayComponents.hour()<14) {
                rets.appendString("中午");
            }else if (listOfdayComponents.hour()<18) {
                rets.appendString("下午");
            }else{
                rets.appendString("晚上");
            }
        } else if (keyOfDayFormater.stringFromDate(date).isEqualToString(keyOfDayFormater.stringFromDate(yesterdayDate))) {
            rets.appendString("昨天");
        } else {
            rets.appendString(weekDayString.objectAtIndex(listOfdayComponents.weekday()-1));
        }
        //[rets appendString:[NSString stringWithFormat:@"%@%zd:%@%zd",hour,listOfdayComponents.hour,minute,listOfdayComponents.minute]];
        var jsStr =  hour + listOfdayComponents.hour() +":"+ minute + listOfdayComponents.minute() +" · " + "第 " + new_ep_index.toJS() + " 话";
        rets.appendString(jsStr);
        return rets;

    }
})

//SW 首页番剧中的完结动画cell SWHomeBangumiDidEndCell (有可以滚动的item) 完结动画
defineClass("SWHomeBangumiDidEndCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){
        if(self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.contentView().setBackgroundColor(UIColor.whiteColor());
            self.setSelectionStyle(0);
             var scrollView = UIScrollView.new();
            scrollView.setShowsHorizontalScrollIndicator(0);
            self.contentView().addSubview(scrollView);
            self.setProp_forKey(scrollView,"scrollView");
        }
        return self;
    },
    installData:function(array){
        if(array.count()<=0){
            return;
        }
        var itemArray = NSMutableArray.new();
       var scrollView = self.getProp("scrollView");
        // 这个地方先要移除所有的子控件是因为tableview在上下滑动重用的时候会导致下面这个for循环多次调用，导致scrollView上面叠加了很多的item，导致重影，解决方法有两个，第一就是下面的这种方法，先移除以前的item，然后重新添加，再一种方法就是直接不重用。
        scrollView.subviews().makeObjectsPerformSelector('removeFromSuperview');

        for(var i = 0; i< array.count(); i++){
            var didEndItem= SWHomeBangumiDidEndItem.new();
            scrollView.addSubview(didEndItem);
            itemArray.addObject(didEndItem);
            didEndItem.installData(array.objectAtIndex(i));
        }
        self.setProp_forKey(itemArray,"itemArray");
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        self.getProp("scrollView").setFrame(self.bounds());
        var itemArray = self.getProp("itemArray");
        if(itemArray.count() <= 0){
            return;
        }
        var margin = 12;
        var width;
        if(UIScreen.mainScreen().bounds().width <= 320){
            width = 110;
        }else{
            width = 128;
        }
        //高宽比
        var scale = 1.32;
        var height = width * scale;
        for(var i = 0; i < itemArray.count(); i++){
            var item = itemArray.objectAtIndex(i);
            item.setFrame({x:margin + (margin + width) * i, y:0, width:width, height:SWHomeBangumiDidEndItem.getHeight()});
        }
        self.getProp("scrollView").setContentSize({width:(width + margin) * itemArray.count() + margin, height:SWHomeBangumiDidEndItem.getHeight()});

    }

},{
  getHeight:function(){
      return SWHomeBangumiDidEndItem.getHeight();
  }
})

// SW 首页番剧中的完结动画cell中的item  完结动画item
defineClass("SWHomeBangumiDidEndItem:UIView",{
    init:function(){
      if(self.ORIGinit()){
          var coverImage = UIImageView.new();
          self.setProp_forKey(coverImage,"coverImage");
          coverImage.layer().setCornerRadius(5);
          coverImage.setClipsToBounds(1);
          self.addSubview(coverImage);

          var titleLabel = SWLabel.new();
          self.setProp_forKey(titleLabel,"titleLabel");
          titleLabel.setFont(UIFont.systemFontOfSize(14));
          titleLabel.setTextAlignment(1);
          self.addSubview(titleLabel);

          var epLabel = SWLabel.new();
          self.setProp_forKey(epLabel,"epLabel");
          epLabel.setTextAlignment(1);
          epLabel.setFont (UIFont.systemFontOfSize(12));
          epLabel.setTextColor(normalGrayColor);
          self.addSubview(epLabel);


      }
       return self;
    },
    installData:function(model){
        if(!model){
            return;
        }
        var epTitle = model.objectForKey("total_count") ;
        var urlStr = model.objectForKey("cover");
        var url = NSURL.URLWithString(urlStr);
        self.getProp("coverImage").sd__setImageWithURL(url);
        self.getProp("titleLabel").setText( model.objectForKey("title"));
        self.getProp("epLabel").setText(epTitle.toJS() +"话全");
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var width;
        if(UIScreen.mainScreen().bounds().width <= 320){
            width = 110;
        }else{
            width = 128;
        }
        //高宽比
        var scale = 1.320;
        var height = width * scale ;
        self.getProp("coverImage").setFrame({x:0, y:0, width:width, height:height});
        self.getProp("titleLabel").setFrame({x:0, y:height + 6, width:width, height:17});
        // 第一个6为 titleLabel到cover的间距  17为titleLabel的高度 第二6为titleLabel到epLabel的间距 14.5为epLabel的高度
        self.getProp("epLabel").setFrame({x:0, y:height + 6 + 17 + 6, width:width, height:14.5});
    }
},{
    getHeight:function(){
        var width;
        if(UIScreen.mainScreen().bounds().width <= 320){
            width = 110;
        }else{
            width = 128;
        }
        //高宽比
        var scale = 1.32;
        var height = width * scale;
        // height为cover的高度 第一个6为 titleLabel到cover的间距  17为titleLabel的高度 第二6为titleLabel到epLabel的间距 14.5为epLabel的高度 12为底部默认留的间距
        return height + 6 + 17 + 6 + 14.5 + 12;
    }
})

// SW 首页番剧中带有一个封面banner 一个title 一个content(其中有一个cell头部带有番剧推荐字样，我想通过继承关系子类通过条件去掉该番剧推荐字样)  番剧推荐
defineClass("SWHomeBangumiRecommendCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){
        if(self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            self.contentView().setBackgroundColor(bgGrayColor);
            self.setSelectionStyle(0);

            var bgView = UIView.new();
            self.contentView().addSubview(bgView);
            bgView.setBackgroundColor(UIColor.whiteColor());
            bgView.layer().setCornerRadius(5);
            bgView.setClipsToBounds(1);
            self.setProp_forKey(bgView,"bgView");

            var coverImage = UIImageView.new();
            bgView.addSubview(coverImage);
            self.setProp_forKey(coverImage,"coverImage");

            var newIconImage = UIImageView.new();
            bgView.addSubview(newIconImage);
            newIconImage.setImage(UIImage.imageNamed("home_bangumi_tableHead_new"));
            self.setProp_forKey(newIconImage,"newIconImage");

            var titleLabel = SWLabel.new();
            self.setProp_forKey(titleLabel,"titleLabel");
            titleLabel.setFont (UIFont.systemFontOfSize(14));
            //titleLabel.setTextAlignment(1);
            bgView.addSubview(titleLabel);

            var detailLabel = SWLabel.new();
            self.setProp_forKey(detailLabel,"detailLabel");
            //epLabel.setTextAlignment(1);
            detailLabel.setNumberOfLines(0);
            detailLabel.setFont (UIFont.systemFontOfSize(12));
            detailLabel.setTextColor(normalGrayColor);
            bgView.addSubview(detailLabel);


        }
        return self;
    },
    installData:function(model){
        if(!model) {
            return;
        }
        var scale = 3.2;
        //12为两边的间距
        var width = UIScreen.mainScreen().bounds().width - 12 * 2;
        var coverHeight = width /3.2;
        var detailHeight = self.calculateDetailLabelHeight(model.objectForKey("desc"));
        self.getProp("coverImage").setFrame({x:0, y:0, width:width, height:coverHeight});
        self.getProp("newIconImage").setFrame({x:width - 20 - 44, y:0, width:44, height:22.5});
        self.getProp("titleLabel").setFrame({x:12, y:coverHeight + 12, width:width - 12, height:17});
        self.getProp("detailLabel").setFrame({x:12, y:coverHeight + 12 + 17 + 12, width:width - 12, height:detailHeight});
        var desc = model.objectForKey("desc");
        self.getProp("detailLabel").setText(desc);
        self.getProp("titleLabel").setText(model.objectForKey("title"));
        var urlStr = model.objectForKey("cover");
        var url = NSURL.URLWithString(urlStr);
        self.getProp("coverImage").sd__setImageWithURL(url);
        self.getProp("bgView").setFrame({x:12, y:0 , width:width , height:coverHeight + 12 + 17 + 12 + detailHeight + 12});

        var is_new = model.objectForKey("is_new");
        if(is_new){
            self.getProp("newIconImage").setHidden(0);
        }else{
            self.getProp("newIconImage").setHidden(1);
        }

    },
    calculateDetailLabelHeight:function(desc){
        var attributeDict = {
            "NSFont":UIFont.systemFontOfSize(12)
        };
        var boundWidth = UIScreen.mainScreen().bounds().width - 12 * 2 - 12;
        var size = {width:boundWidth, height: 1000};
        var rect = desc.boundingRectWithSize_options_attributes_context(size,1 << 0,attributeDict,null);
        return rect.height ;
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
    }

},{
    getHeight:function(desc){
        var scale = 3.2;
        //12为两边的间距
        var attributeDict = {
            "NSFont":UIFont.systemFontOfSize(12),
        };
        var width = UIScreen.mainScreen().bounds().width - 12 * 2;
        var coverHeight = width /3.2;
        var boundWidth = UIScreen.mainScreen().bounds().width - 12 * 2 - 12;
        var size = {width:boundWidth, height: 1000};
        var height = desc.boundingRectWithSize_options_attributes_context(size,1 << 0,attributeDict,null).height ;
        //第一个12 为coverImage与titleLabel的间距  第二个12为titleLabel和detailLabel的间距 第三个12为detailLabel下面默认留12的间距  最后一个12为cell高度默认在bgView的高度的基础上面再加12.
        return  coverHeight + 12 + 17 + 12 + height + 12 + 12 ;
    }

})

// SWHome  首页番剧 新番连载  完结动画 番剧推荐 共用的headView（首页推荐 直播中都会用到）
defineClass("SWHomeBangumiUniversalHeadView:UITableViewHeaderFooterView",{
    initWithReuseIdentifier:function(reuseIdentifier){
        if(self.ORIGinitWithReuseIdentifier(reuseIdentifier)){
            self.contentView().setBackgroundColor(UIColor.whiteColor());

            var iconImage = UIImageView.new();
            self.contentView().addSubview(iconImage);
            self.setProp_forKey(iconImage,"iconImage");

            var titleLable = SWLabel.new();
            titleLable.setFont(UIFont.systemFontOfSize(15));
            self.contentView().addSubview(titleLable);
            self.setProp_forKey(titleLable,"titleLable");

            var descLabel = SWLabel.new();
            descLabel.setTextAlignment(2);
            self.contentView().addSubview(descLabel);
            descLabel.setFont(UIFont.systemFontOfSize(15));
            self.setProp_forKey(descLabel,"descLabel");
            descLabel.setTextColor(normalGrayColor);

            var rightRowImage = UIImageView.new();
            rightRowImage.setImage(UIImage.imageNamed("home_right_arrow"));
            self.contentView().addSubview(rightRowImage);
            self.setProp_forKey(rightRowImage,"rightRowImage");

        }
        return self;
    },
    installModel:function(model){
        // 这个方法是为了兼容 首页推荐页面中用这个header
        if(!model ||! model.isKindOfClass(NSDictionary.class())){
            return;
        }
        var title = model.objectForKey("title");
        var desLabel = self.getProp("descLabel");
        var iconImage = self.getProp("iconImage");
        self.getProp("titleLable").setText(title);
        if(title.length() > 0){
            desLabel.setText("更多" + title.substringToIndex(title.length() - 1).toJS());
        }
        desLabel.setTextColor(normalGrayColor);
        if(title.isEqualToString("热门焦点")){
            // 热门推荐的descLabel也要做改变
            desLabel.setTextColor(bgOtherYellowColor);
           var attachment = NSTextAttachment.new();
            attachment.setBounds({x:0, y:-3, width:20, height:16.5});
            var image = UIImage.imageNamed("bangumi_rank_ico");
           image = SWJSPatchNotSupportTool.imageWithColor_image(bgOtherYellowColor,image);
            console.log(image);
            attachment.setImage(image);
            var atributeText = NSAttributedString.attributedStringWithAttachment(attachment);
            var attrbuteString = NSMutableAttributedString.alloc().initWithString(" 排行榜");
            attrbuteString.insertAttributedString_atIndex(atributeText,0);
            desLabel.setAttributedText(attrbuteString);
            iconImage.setImage(UIImage.imageNamed("recommend.compressed"));
            self.getProp("titleLable").setText("热门推荐");
        }else if(title.isEqualToString("热门直播")){
            // 直播的descLabel宽度要做处理
                var number = model.objectForKey("ext").objectForKey("live_count");
                number = number + "";
                var totalTitle = "当前" + number + "个直播，" +"进去看看";
                desLabel.setText(totalTitle);
                var attrbuteString = NSMutableAttributedString.alloc().initWithString(desLabel.text());
            if(totalTitle.length > 2 + number.length){
                var range = {location:2,length:number.length};
            }
                attrbuteString.addAttribute_value_range("NSColor",mainColor,range);
                desLabel.setAttributedText(attrbuteString);

            iconImage.setImage(UIImage.imageNamed("live.compressed"));
        }else if(title.isEqualToString("番剧推荐")){
            iconImage.setImage(UIImage.imageNamed("region.compressed"));
            if(title.length() >= 2){
                desLabel.setText("更多" + title.substringToIndex(title.length() - 2).toJS());
            }
        }else if(title.isEqualToString("动画区")){
            iconImage.setImage(UIImage.imageNamed("region.compressed"));
        }else if(title.isEqualToString("音乐区")){
            iconImage.setImage(UIImage.imageNamed("音乐_60.compressed"));
        }else if(title.isEqualToString("舞蹈区")){
            iconImage.setImage(UIImage.imageNamed("舞蹈_60.compressed"));
        }else if(title.isEqualToString("游戏区")){
            iconImage.setImage(UIImage.imageNamed("游戏_60.compressed"));
        }else if(title.isEqualToString("鬼畜区")){
            iconImage.setImage(UIImage.imageNamed("鬼畜_60.compressed"));
        }else if(title.isEqualToString("科技区")){
            iconImage.setImage(UIImage.imageNamed("科技_60.compressed"));
        }else if(title.isEqualToString("活动中心")){
            iconImage.setImage(UIImage.imageNamed("home_region_icon_160"));
        }else if(title.isEqualToString("生活区")){
            iconImage.setImage(UIImage.imageNamed("home_region_icon_160"));
        }else if(title.isEqualToString("时尚区")){
            iconImage.setImage(UIImage.imageNamed("home_region_icon_155"));
        }else if(title.isEqualToString("娱乐区")){
            iconImage.setImage(UIImage.imageNamed("home_region_icon_155"));
        } else if(title.isEqualToString("电视剧区")){
            iconImage.setImage(UIImage.imageNamed("电视剧_60.compressed"));
        }else if(title.isEqualToString("电影区")){
            iconImage.setImage(UIImage.imageNamed("电影_60.compressed"));
        }

    },
    installData_section:function(dict,section){
        if(!dict){
            return;
        }
        var rightRowImage = self.getProp("rightRowImage");
        if(section == 3){
            rightRowImage.setHidden(1);
        }else{
            rightRowImage.setHidden(0);
        }
        self.getProp("iconImage").setImage(UIImage.imageNamed(dict.objectForKey("imageName")));
        var title = dict.objectForKey("title");
        self.getProp("titleLable").setText(title);
        var desc = dict.objectForKey("desc");
        var count = dict.objectForKey("count");
        var desLabel = self.getProp("descLabel");
        if(section == 1){
            var totalTitle = desc.toJS() + " " + count.toJS();
            desLabel.setText(totalTitle);
            var attrbuteString = NSMutableAttributedString.alloc().initWithString(desLabel.text());
            var range;
            if(count.intValue() >= 10){
                range = {location:totalTitle.length - 2,length:2};
            }else{
                range = {location:totalTitle.length - 1,length:1};
            }


            attrbuteString.addAttribute_value_range("NSColor",mainColor,range);
            desLabel.setAttributedText(attrbuteString);
        }else{
            desLabel.setText(desc);
        }
        self.setProp_forKey(section,"section");
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var rect = self.bounds();
        self.getProp("iconImage").setFrame({x:12, y:12, width:20, height:20});
        self.getProp("titleLable").setFrame({x:36, y:13, width:75, height:18});
        var section = self.getProp("section");
        self.getProp("descLabel").setFrame({x:rect.width - 12 - 20 - 10 - 200 , y:13, width:200, height:18});
        self.getProp("rightRowImage").setFrame({x:rect.width - 12 - 20, y:13, width:20, height:20});
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

defineClass("SWHomeSecondViewController: SWHomeViewController<UITableViewDelegate>", {
    tableView_didSelectRowAtIndexPath: function (tableView, indexPath) {
        tableView.deselectRowAtIndexPath_animated(indexPath,1);
        var dict = self.getProp("data").objectAtIndex(indexPath.row());
        var urlStr = dict.objectForKey('face');
        var url = NSURL.URLWithString(urlStr);
        var imageView = self.lazyImageView();
        imageView.sd__setImageWithURL(url);
        self.view().addSubview(imageView);
  
    }
})


//SW分区----------------------//SW分区----------------------//SW分区----------------------//SW分区----------------------//SW分区----------------------//SW分区----------------------//SW分区----------

defineClass("SWCategoryController: SWBaseViewController<UICollectionViewDataSource,UICollectionViewDelegateFlowLayout,UICollectionViewDelegate>",{
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
    },
    viewDidLoad:function(){
      self.super().viewDidLoad();
        self.view().setBackgroundColor(UIColor.whiteColor());


        var navBar = SWLabel.new();
        self.view().addSubview(navBar);
        navBar.setBackgroundColor(mainColor);
        navBar.setText("分区");
        navBar.setTextColor(UIColor.whiteColor());
        navBar.setTextAlignment(1);
        navBar.setFont(UIFont.systemFontOfSize(15));
        navBar.installVerticalAlignment(103);
        self.setProp_forKey(navBar,"navBar");

        var layout = UICollectionViewFlowLayout.alloc().init();
        layout.setSectionInset({top:24, left:30, bottom:24, right:30});
        layout.setScrollDirection(0);
        var collectionView = UICollectionView.alloc().initWithFrame_collectionViewLayout(self.view().bounds(),layout);
        collectionView.setPagingEnabled(1);collectionView.setBackgroundColor(UIColor.whiteColor());
        collectionView.setDataSource(self);collectionView.setShowsHorizontalScrollIndicator(0);
        collectionView.setDelegate(self);
        self.setProp_forKey(collectionView,"collectionView");
        collectionView.registerClass_forCellWithReuseIdentifier(SWCategoryCell.class(), SWCategoryCell.description());
        self.view().addSubview(collectionView);
        var dataArray = [{"title":"直播","imageName":"live.compressed"},{"title":"番剧","imageName":"番剧_60.compressed"},{"title":"动画","imageName":"region.compressed"},{"title":"音乐","imageName":"音乐_60.compressed"},
            {"title":"舞蹈","imageName":"舞蹈_60.compressed"},{"title":"游戏","imageName":"游戏_60.compressed"},{"title":"科技","imageName":"科技_60.compressed"},{"title":"生活","imageName":"home_region_icon_160"},
            {"title":"鬼畜","imageName":"鬼畜_60.compressed"},{"title":"时尚","imageName":"hd_bangumi_unfinished"},{"title":"娱乐","imageName":"home_region_icon_155"},{"title":"电影","imageName":"电影_60.compressed"},
            {"title":"电视剧","imageName":"电视剧_60.compressed"},{"title":"游戏中心","imageName":"people_gameCenter"}];
        self.setProp_forKey(dataArray,"dataArray");

    },
    collectionView_cellForItemAtIndexPath:function(collectionView,indexPath){
        var cell = collectionView.dequeueReusableCellWithReuseIdentifier_forIndexPath(SWCategoryCell.description(),indexPath);
        var dataArray = self.getProp("dataArray");
        var dict;
        if(dataArray.count() > 0) {
            if(indexPath.item() < dataArray.count()) {
                dict = dataArray.objectAtIndex(indexPath.item());
            }
        }
        cell.installData(dict,indexPath);
        return cell;
    },
    collectionView_numberOfItemsInSection:function(collectionView,section){
        return self.getProp("dataArray").count();
    },
    collectionView_layout_sizeForItemAtIndexPath:function(collectionView,collectionViewLayout,indexPath){
        return {width:72, height:76 +20 };
    },
    collectionView_layout_minimumLineSpacingForSectionAtIndex:function(collectionView,layout,section){
        //layout 方向是横向的时候就是调整横向的间距，如果是竖向的时候就是调竖向的间距
        return 10;

    },
    collectionView_layout_minimumInteritemSpacingForSectionAtIndex:function(collectionView,layout,section){
        //这个明显就是调整上面相反方向间距的。
        return 30;
    },
    viewWillAppear:function(animation){
        self.super().viewWillAppear(animation);
        self.navigationController().setNavigationBarHidden_animated(1,1);

    },
    viewWillLayoutSubviews:function(){
     self.super().viewWillLayoutSubviews();
        var rect = self.view().bounds();
        self.getProp("navBar").setFrame({x:0, y:0, width:rect.width, height: 64 });
        self.getProp("collectionView").setFrame({x:0, y:64, width:rect.width, height:rect.height - 64 - 44});
    }

})

defineClass("SWCategoryCell:UICollectionViewCell",{
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){
           var bgImageView = UIImageView.new();
            self.contentView().addSubview(bgImageView);
            self.setProp_forKey(bgImageView,"bgImageView");
            bgImageView.setImage(UIImage.imageNamed("home_subregion_border"));

            var iconImage = UIImageView.new();
            bgImageView.addSubview(iconImage);
            self.setProp_forKey(iconImage,"iconImage");

            var titleLabel = UILabel.new();
            self.contentView().addSubview(titleLabel);
            titleLabel.setFont(UIFont.systemFontOfSize(14));
            titleLabel.setTextAlignment(1);
            self.setProp_forKey(titleLabel,"titleLabel");


        }
        return self;
    },
    installData:function(dict,indexPath){
        if(!dict){
            return;
        }
        if(indexPath.item() == 13){
            self.getProp("bgImageView").setImage(UIImage.imageNamed("home_subregion_tv_border"));
        }else{
            self.getProp("bgImageView").setImage(UIImage.imageNamed("home_subregion_border"));
        }
        self.getProp("iconImage").setImage(UIImage.imageNamed(dict.objectForKey("imageName")));
        self.getProp("titleLabel").setText(dict.objectForKey("title"));
        if(indexPath.item() == 13){
            self.getProp("iconImage").setFrame({x:6, y:21, width:60, height:50});
        }else{
            self.getProp("iconImage").setFrame({x:11, y:10, width:50, height:50});
        }
    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        self.getProp("bgImageView").setFrame({x:0, y:0, width:72, height:76});
        self.getProp("titleLabel").setFrame({x:0, y:76, width:self.bounds().width, height:17});
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



//public element 自己手动封装一些公共控件--------------------------------------//public element 自己手动封装一些公共控件--------------------------------------//public element 自己手动封装一些公共控件--------------------------------------
defineClass("SWContainerView:UIView<UIScrollViewDelegate>",{
    init:function(){
        if(self.ORIGinit()){
            //初始化子控件
            var scrollView = UIScrollView.alloc().init();
            scrollView.setShowsVerticalScrollIndicator(0);
            scrollView.setShowsHorizontalScrollIndicator(0);
            scrollView.setPagingEnabled(1);
            scrollView.setBounces(0);
            scrollView.setDelegate(self);
            scrollView.setScrollsToTop(0);
            self.setProp_forKey(scrollView,"scrollView");
            self.addSubview(scrollView);

            var topBar = SWTopBar.alloc().init();
            topBar.setProp_forKey(self,"delegate");
            topBar.setBackgroundColor(mainColor);
            self.setProp_forKey(topBar,"topBar");
            self.addSubview(topBar);
            self.setUserInteractionEnabled(1);
            self.setProp_forKey(64,"topBarHeight");

        }
        return self;
    },
    //topBarDelegate
    changeContentOffset:function(tag){
        var scrollView = self.getProp("scrollView");
        var rect = scrollView.bounds();
        var scrollViewWidth = rect.width;
        UIView.animateWithDuration_animations(0.25,block("",function(){
            scrollView.setContentOffset({x:tag*scrollViewWidth, y:0});
        }));
    },
    //scrollView delegate
    scrollViewDidEndDecelerating:function(scrollView){
        var rect = scrollView.bounds();
        var width = rect.width;
       var selectIndex = scrollView.contentOffset().x/width;
        self.getProp("topBar").changeSelectIndex(selectIndex);
    },
    scrollViewDidScroll:function(scrollView){
        self.getProp("topBar").slowChangeIndicatorViewFrame(scrollView.contentOffset().x/scrollView.frame().width);
    },
    installViewControllers:function(array){
      self.setProp_forKey(array,"vcArray");
         var scrollView = self.getProp("scrollView");
        var titles = NSMutableArray.alloc().init();
        var count = array.count();
        for(var i = 0;i<count; i++){
            var vc = array.objectAtIndex(i);
            var title = vc.title();
            titles.addObject(title);
            scrollView.addSubview(vc.view());
        }
        self.getProp("topBar").installTitles(titles);

    },
    layoutSubviews:function(){
        self.super().layoutSubviews();
        var topBarHeight = self.getProp("topBarHeight");
        var scrollView = self.getProp("scrollView");
        scrollView.setFrame(self.bounds());
        var rect = self.bounds();
        var viewWidth = rect.width;
        var viewHeight = rect.height;
        self.getProp("topBar").setFrame({x:0, y:0, width:viewWidth, height:topBarHeight});
        scrollView.setFrame({x:0, y:topBarHeight, width:viewWidth, height:viewHeight - topBarHeight });
        var vcs = self.getProp("vcArray");
        var count = vcs.count();
        if(count > 0){
            for(var i = 0;i<count; i++){
                var vc = vcs.objectAtIndex(i);
                vc.view().setFrame({x:i*viewWidth, y:0, width:viewWidth, height:viewHeight - topBarHeight });
            }

        }
        scrollView.setContentSize({width:viewWidth*count,height:viewHeight - topBarHeight });
    }

})

// 封装的container的子控件topBar
defineClass("SWTopBar:UIView",{
    init:function(){
      if(self.ORIGinit()){
      }
        return self;
    },
    installTitles:function(titleArray){
        var count = titleArray.count();
        if(count <= 0){
            return;
        }
        self.setProp_forKey(titleArray,'titleArray');
        for(var i = 0; i<count; i++){
            var title = titleArray.objectAtIndex(i);
            var titleLabel = UILabel.alloc().init();
            titleLabel.setTextAlignment(1);
            titleLabel.setTextColor(UIColor.whiteColor());
            titleLabel.setText(title);
            titleLabel.setTag(i);
            titleLabel.setUserInteractionEnabled(1);
            var tap = UITapGestureRecognizer.alloc().initWithTarget_action(self,"tapClick:");
            titleLabel.addGestureRecognizer(tap);
            self.addSubview(titleLabel);
        }
        var indicatorView = UIView.alloc().init();
        self.addSubview(indicatorView);
        indicatorView.setBackgroundColor(UIColor.whiteColor());
        self.setProp_forKey(indicatorView,"indicatorView");
    },
    changeSelectIndex:function(selectIndex){
        var subviewsArray = self.subviews();
        if(selectIndex < subviewsArray.count()){
            var indicatorView = self.getProp("indicatorView");
            var label = subviewsArray.objectAtIndex(selectIndex);
            var labelX = label.frame().x;
            var rect = self.bounds();
            var viewWidth = rect.width;
            var viewHeight = rect.height;
            var count = self.subviews().count();
            var temWidth = (viewWidth - 100) / (count - 1);
            //下面的 加x上面10 和width-20是因为indicatorView宽度太宽
            UIView.animateWithDuration_animations(0.25,block("",function(){
                indicatorView.setFrame({x:labelX + 10, y:viewHeight - 3, width:temWidth - 20, height:2});
            }));

        }
    },
    slowChangeIndicatorViewFrame:function(scaleProgress){
        if(scaleProgress!=scaleProgress){
            return;
        }
    },
    tapClick:function(tap){
        var tag = tap.view().tag();
        var rect = self.bounds();
        var viewWidth = rect.width;
        var labelX = tap.view().frame().x;
        var count = self.subviews().count();
        var viewHeight = rect.height;
        var temWidth = (viewWidth - 100) / (count - 1);
        UIView.animateWithDuration_animations(0.25,block("",function(){
            self.getProp("indicatorView").setFrame({x:labelX + 10, y:viewHeight - 3, width:temWidth - 20, height:2});
        }));

        self.getProp("delegate").changeContentOffset(tag);

    },
    layoutSubviews:function() {
        self.super().layoutSubviews();
        var rect = self.bounds();
        var viewWidth = rect.width;
        var viewHeight = rect.height;
        var count = self.subviews().count();
        var titleArray = self.getProp("titleArray");
        var titleLabelArray = self.subviews();
        var temWidth = (viewWidth - 100) / (count - 1);
        if (count > 0) {
            for (var i = 0; i < count; i++) {
                var titleLabel = titleLabelArray.objectAtIndex(i);
                titleLabel.setFrame({x: 50 + temWidth * i, y: 10, width: temWidth, height: viewHeight});
                if(i ==count - 1){
                titleLabel.setFrame({x:60, y:viewHeight - 3, width:temWidth - 20, height:2});
                };
            }
        }
    }
})

// 不允许悬浮的tableView
defineClass("SWTableView:UITableView",{
  allowsHeaderViewsToFloat:function(){
      return 0;
  },
    initWithFrame:function(frame){
        if(self.ORIGinitWithFrame(frame)){
            self.setSeparatorStyle(0);
        }
        return self;
    }
})

//可以垂直居中的label
defineClass("SWLabel:UILabel",{
    installVerticalAlignment:function(verticalAlignment) {
        self.setProp_forKey(verticalAlignment,"verticalAlignment");
        self.setNeedsDisplay();
},
    textRectForBounds_limitedToNumberOfLines:function(bounds,numberOfLines){
    var textRect = self.super().textRectForBounds_limitedToNumberOfLines(bounds,numberOfLines);
        //101 为垂直顶部对齐
        if(self.getProp("verticalAlignment") == 101){
            textRect.y = bounds.y;
            return textRect;
        }

        //102 为垂直底部对齐
        if(self.getProp("verticalAlignment") == 102){
            textRect.y = bounds.y + bounds.height - textRect.height;
            return textRect;
        }
        //103 为垂直居中对齐 这里直接设置居中为默认
        if(self.getProp("verticalAlignment") == 103){
            //下面这个加 1 是临时加上去的 是脏代码。
            textRect.y = bounds.y +(bounds.height - textRect.height)/2.0 - 1 ;
            return textRect;

        }
        return textRect;

},
    drawTextInRect:function(requestedRect) {
    var actualRect = self.textRectForBounds_limitedToNumberOfLines(requestedRect,self.getProp("numberOfLines"));
    self.super().drawTextInRect(actualRect);
}
})

//首页番剧中不允许显示分隔线 的tableViewCell
defineClass("SWHomeBangumiCell:UITableViewCell",{
    initWithStyle_reuseIdentifier:function(style,reuseIdentifier){
        if(self.ORIGinitWithStyle_reuseIdentifier(style,reuseIdentifier)){
            //self.setSelectionStyle(0);
        }
        return self;
    }
})

//用CollectionView开始封装banner
defineClass('SWBannerCollectionView:UIView <UICollectionViewDataSource,UICollectionViewDelegateFlowLayout,UICollectionViewDelegate>', {
            initWithFrame:function(frame) {
            if(self.ORIGinitWithFrame(frame)){
            var layout = UICollectionViewFlowLayout.alloc().init();
            layout.setScrollDirection(1);
            var collectionView = UICollectionView.alloc().initWithFrame_collectionViewLayout(frame,layout);
            collectionView.setPagingEnabled(1);collectionView.setBackgroundColor(UIColor.whiteColor());
            collectionView.setDataSource(self);collectionView.setShowsHorizontalScrollIndicator(0);
            collectionView.setDelegate(self);
            self.setProp_forKey(collectionView,"collectionView");
            collectionView.registerClass_forCellWithReuseIdentifier(SWCollectionViewCell.class(), SWCollectionViewCell.description());
            self.addSubview(collectionView);
            }
            return self;
            },
            refreshLayout:function(){
                self.getProp("collectionView").collectionViewLayout().invalidateLayout();
            },
            installData:function(array) {
            if(array.count() <= 0) {
            return;
            }
            self.setProp_forKey(array,"dataArray");
            self.getProp("collectionView").reloadData();
                self.setupPageControll();
                self.addTimer();
            },
            
            collectionView_cellForItemAtIndexPath:function(collectionView,indexPath){
            var cell = collectionView.dequeueReusableCellWithReuseIdentifier_forIndexPath(SWCollectionViewCell.description(),indexPath);
            var dataArray = self.getProp("dataArray");
            var model;
            if(dataArray.count() > 0) {
            if(indexPath.item() < dataArray.count()) {
            model = dataArray.objectAtIndex(indexPath.item());
            }
            }

                var imageUrl = model.objectForKey("img");
                // 模型容错
                if(!imageUrl){
                    imageUrl = model.objectForKey("image");
                }
            cell.installData(imageUrl);
            return cell;
            },
            numberOfSectionsInCollectionView:function(collectionVew){
              return 10;
            },
            collectionView_numberOfItemsInSection:function(collectionView,section){
            return self.getProp("dataArray").count();
            },

            collectionView_layout_sizeForItemAtIndexPath:function(collectionView,collectionViewLayout,indexPath){
                return {width:self.getProp("collectionView").bounds().width, height:self.getProp("collectionView").bounds().width/3.2 };
           },
    collectionView_layout_minimumLineSpacingForSectionAtIndex:function(collectionView,layout,section){
    return 0;

    },
    collectionView_layout_minimumInteritemSpacingForSectionAtIndex:function(collectionView,layout,section){
      return 0;
    },

    scrollViewDidEndDragging_willDecelerate:function(scrollView,decelerate){
      self.addTimer();
    },
    scrollViewWillBeginDragging:function(scrollView){
      self.removeTimer();
    },
    scrollViewDidScroll:function(scrollView){
    var num = (scrollView.contentOffset().x/scrollView.bounds().width)%self.getProp("dataArray").count();
        //JS中的取整函数
       num = Math.round(num);
    self.getProp("pageControll").setCurrentPage(num);
    },
    //pageController配置
    setupPageControll:function() {
    var pageControll = UIPageControl.new();
    //pageControll.backgroundColor = [UIColor redColor];
        self.addSubview(pageControll);
        self.setProp_forKey(pageControll,"pageControll");
        pageControll.setNumberOfPages(self.getProp("dataArray").count());
        pageControll.setCurrentPageIndicatorTintColor(mainColor);
        pageControll.setPageIndicatorTintColor(bgGrayColor);
        if(self.getProp("dataArray").count()<=1){
            self.pageControll().setHidden(1);
        }
},
    addTimer:function(){
        self.removeTimer();
        var timer = NSTimer.scheduledTimerWithTimeInterval_target_selector_userInfo_repeats(3.0,self,"beginScrollBanner",null,1);
        self.setProp_forKey(timer,"timer");


    },
    removeTimer:function(){
        self.getProp("timer").invalidate();
        self.setProp_forKey(null,"timer");
    },
    beginScrollBanner:function(){
        if(self.getProp("dataArray").count() <= 0){
            return;
        }
        var collectionView = self.getProp("collectionView");
        var cellsArray = collectionView.visibleCells();
        var firstCell;
        if(cellsArray.count() >= 1){
            firstCell = cellsArray.firstObject();
        }else{
            return;
        }
        var indexPath = self.resetIndexPath();
        var nextItem = indexPath.item() + 1;
        var nextSection = indexPath.section();
        if (nextItem==self.getProp("dataArray").count()) {
            nextItem = 0;
            nextSection = nextSection + 1;
        }
        var index = NSIndexPath.indexPathForItem_inSection(nextItem,nextSection);
        collectionView.scrollToItemAtIndexPath_atScrollPosition_animated(index,1<<3,1);
    },
    resetIndexPath:function(){
    //每调用一次这个方法，就会将collectionview滚回到最中间的那组的那个一样的图片
        var collectionView = self.getProp("collectionView");
        var indexPaths = collectionView.indexPathsForVisibleItems();
        var  currenIndexPath = indexPaths.count() >= 1 ? indexPaths.firstObject() : null;
        var resetIndexPath = NSIndexPath.indexPathForItem_inSection(currenIndexPath.item(),10/2);
        collectionView.scrollToItemAtIndexPath_atScrollPosition_animated(resetIndexPath,1<<3,0);
        return resetIndexPath;
},
            layoutSubviews:function() {
            self.super().layoutSubviews();
                var rect = self.bounds();
            var collectionView = self.getProp("collectionView");
            collectionView.setFrame(self.bounds());
                self.getProp("pageControll").setFrame({x:rect.width -rect.width/4, y:rect.height - 25, width:rect.width/4, height:20});
            
            }
            
        
})
//banner 里面的cell
defineClass('SWCollectionViewCell:UICollectionViewCell',{
            initWithFrame:function(frame) {
            if(self.ORIGinitWithFrame(frame)) {
            var imageView = UIImageView.new();
            self.contentView().addSubview(imageView);
            self.setProp_forKey(imageView,"imageView");
            }
            return self;
            },
            
            installData:function(cover) {
            if(!cover.length()){
            return;
            }
            var urlStr = NSURL.URLWithString(cover);
            self.getProp("imageView").sd__setImageWithURL(urlStr);
            },
            
            layoutSubviews:function() {
            self.super().layoutSubviews();
            self.getProp("imageView").setFrame(self.contentView().bounds());
            }
            
})