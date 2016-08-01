//
//  SWBaseViewController.m
//  Bili_TestHtmlJquery
//
//  Created by 苏威 on 16/7/15.
//  Copyright © 2016年 苏威. All rights reserved.
//

#import "SWBaseViewController.h"
#import "ReactiveCocoa.h"
@interface SWBaseViewController ()<UIScrollViewDelegate>

@end

@implementation SWBaseViewController
- (id)init{
    if (self = [super init]) {
        self.tabBarItem.imageInsets = UIEdgeInsetsMake(6, 0, -6, 0);
        self.automaticallyAdjustsScrollViewInsets = NO;
        UILabel* label;
        
    }
    return self;
}


- (void)viewDidLoad {
    [super viewDidLoad];

    
    
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
