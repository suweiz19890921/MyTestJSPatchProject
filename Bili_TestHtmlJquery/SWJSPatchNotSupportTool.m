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

// 这个方法是给view固定方向 添加圆角的方法， 因为在JSPatch中只要创建CAShapeLayer就会崩溃，只能在 OC中完成。
+ (void)clipCornerRadusWithView:(UIView *)view size:(CGSize)size direct:(UIRectCorner)direct rect:(CGRect)rect
{
    UIBezierPath *maskPath = [UIBezierPath bezierPathWithRoundedRect:view.bounds byRoundingCorners:direct cornerRadii:size];
    CAShapeLayer *maskLayer = [[CAShapeLayer alloc] init];
    maskLayer.frame = view.bounds;
    maskLayer.path = maskPath.CGPath;
    view.layer.mask = maskLayer;
}
@end
