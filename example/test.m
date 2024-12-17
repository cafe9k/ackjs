//
//  NetworkRequest.m
//  FlickStackr
//
//  Created by Carlos Mejía on 11-09-01.
//  Copyright 2011 iPont. All rights reserved.
//
/*
@interface NetworkRequest()
{
    NSURLConnection *urlConnection;
}
@property(nonatomic,copy) NetworkRequestDictionaryResponse dictionaryHandler;
@end
*/
@implementation NetworkRequest
/*
-(void)createRequestWithUrl:(NSString*)url other:(NSString*)key
{
    NSMutableURLRequest *request = [[NSMutableURLRequest alloc] initWithURL:[NSURL URLWithString:[NSString StringWithString:url]] cachePolicy:NSURLRequestReloadIgnoringLocalCacheData timeoutInterval:defaultNetworkRequestTimeout];
    request.HTTPMethod = requestTypeToHTTPString[@(requestType)];
    urlRequest = request;
    [self sendRequest:urlRequest];
}

-(void)dealloc
{
    [self cancel];
}

*/
-(void)testBlock{
    NSString*(^aBlock)(NSString* arg) = ^NSString*(NSString* arg){
            NSLog(@"arg = %@",arg);
            return arg;
            int(^bBlock)(int arg) = ^int(int arg){
                NSLog(@"arg = %d",arg);
                return arg;
            };
    };
    aBlock(@"哈哈");
}

-(void)createRequestWithUrl:(NSString*)url other:(NSString*)key block:(NSString*(^)(NSString*))blockArg
{
    blockArg(@"???");
}

-(void)testFlowControl{
    if(YES){
        [self wakaka];
    }else if([self isNeed]){
        if([self isOK]){
            for(id test in self.array){
                NSLog(@"%@",test);
            }
        }
    }
}
@end



