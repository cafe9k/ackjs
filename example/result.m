
class NetworkRequest
{
 
-(void)testBlock
{
	 Block aBlock = ^NSString *(NSString * arg)
	{
		NSLog(@"arg = %@",arg);
		return arg;
		 Block bBlock = ^int(int arg)
		{
			NSLog(@"arg = %d",arg);
			return arg;
		} ;
	} ;
	aBlock(@"哈哈");
}

-(void)createRequestWithUrl:(NSString *)url other:(NSString *)key block:(Block)blockArg
{
	blockArg(@"???");
}

-(void)testFlowControl
{
	if(YES)
	{
		self.wakaka();
	}else if(self.isNeed())
	{
		if(self.isOK())
		{
			for(id test in self.array)
			{
				NSLog(@"%@",test);
			}
		}
	}
}
 
}
