function(context, args)
{
    for (var i = 0; i < 20; i++) {
        #s.accts.xfer_gc_to({to:"bender", amount:"1GC"});
    }
    return {ok:true}
}
