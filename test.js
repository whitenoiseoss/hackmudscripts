function(context, args)
{
    // var npcbrute = [];
    // var npc = "abandoned_jb4i70";
    // var tags = ["public", "p", "extern", "out", "entry", "access", "pubinfo", "pub_info", "pub", "single", "info"];
    // var rands = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    // function makeLoc(npc, tg) {
    //     var str = npc + "." + tg + "_";
    //
    // }
    // for (var tg in tags) {
    //
    // }
    var r = [];
    var plocs = [];
    var locs = #db.f({list:"locs"}).array();
    return locs;
    for (var l in locs) {
        var ll = locs[l].loc;
        if (ll == null || ll.includes("sys.init")) {
            return #db.r({list:"locs", loc:ll});
        }
        var sides = ll.split(".");
        if (sides[0].includes("_")) {
            continue;
        } else {
            plocs.push(ll);
        }
    }

    if (args.get == "plocs") {
        return plocs;
    } else if (args.get == "count") {
        r.push("I have "+ locs.length +" locs.");
        r.push("I have "+ plocs.length +" plocs.");
        return r;
    } else if (args.get == "clear") {
        return #db.r({list:"locs"});
    } else {
        return locs;
    }
}
