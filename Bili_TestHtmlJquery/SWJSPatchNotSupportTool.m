//
//  SWJSPatchNotSupportTool.m
//  Bili_TestHtmlJquery
//
//  Created by 苏威 on 16/8/8.
//  Copyright © 2016年 苏威. All rights reserved.
//

#import "SWJSPatchNotSupportTool.h"
#import <UIKit/UIKit.h>

// 这个类中主要存放 JSPatch中不支持的方法

@implementation SWJSPatchNotSupportTool
// 图片颜色渲染， 虽然JSPatch是可以通过extion动态调用C函数，但是调用的C函数的参数类型有限制，不支持结构体 和 block，因此颜色渲染是没有办法完成的
+ (UIImage *)imageWithColor:(UIColor *)color image:(UIImage *)image
{
    UIGraphicsBeginImageContextWithOptions(image.size, NO, image.scale);
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextTranslateCTM(context, 0, image.size.height);
    CGContextScaleCTM(context, 1.0, -1.0);
    CGContextSetBlendMode(context, kCGBlendModeNormal);
    CGRect rect = CGRectMake(0, 0, image.size.width, image.size.height);
    CGContextClipToMask(context, rect, image.CGImage);
    [color setFill];
    CGContextFillRect(context, rect);
    UIImage*newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}
@end
