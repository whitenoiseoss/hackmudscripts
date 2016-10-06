function(context, args)
{
    // lock this down so i dont get flooded with tells
    var cc = context.caller;
    if (cc != "seanmakesgames" && cc != "whitenoise" && cc != "trust") {
        return {ok:false, msg:"Only whitenoise and Sean can run this."}
    }

    // make 8x5 grid
    var graph = [
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8],
        [1, 2, 3, 4, 5, 6, 7, 8]
    ];
    var x = 8;
    var y = 5;

    var h = [
        "\x08", "\x18", "\x1b", "\x80", "\x81", "\x82", "\x83", "\x84",
        "\x85", "\x86", "\x87", "\x88", "\x89", "\x8a", "\x8b", "\x8c",
        "\x8d", "\x8e", "\x8f", "\x90", "\x91", "\x92", "\x93", "\x94",
        "\x95", "\x96", "\x97", "\x98", "\x99", "\x9a", "\x9b", "\x9c",
        "\x9d", "\x9e", "\x9f", "\x11", "\x12", "\x13", "\x14", "\x15"
    ];

    var c = 0;
    var o = [];

    for (var yi = 0; yi < y; yi++) {
        for (var xi = 0; xi < x; xi++) {
            graph[yi][xi] = "\t.";
            o.push("\t:"+h[c]+"::");
            c++;
        }
        o.push("\n");
    }
    o.push("\nThis demonstrates " + o.length + " possible ways to make triple colons.\n");

    return #s.chats.tell({to:"whitenoise", msg:"\n"+o.join("")+"\n"});
}
