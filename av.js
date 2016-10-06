function(context, args)
{
    var stdout = [];

    var blacklist = [
        "v",
        "scritps",
        "script",
        "chat",
        "init",
        "reinit",
        "kernal",
        "kerne1"
    ];

    var whitelist = [
        "whitenoise"
    ];

    var nullsecs = #s.scripts.nullsec({});

    // deny by default
    var pass = false;

    if (!args || args.length < 2) {
        stdout.push("\n\t\t\t\t\t\t\t`1::: WHITENOISE ANTIVIRUS :::`\n");
        stdout.push("This is a script meant to be embedded in other scripts, but it \
could also be used as a manual scan.\n\nUsage:\n");
        stdout.push("\tIn code, call whitenoise.av({s:\"dtr.man\", e:4})");
        stdout.push("\tThis will return +true+ if dtr.man has a security level of !4! or greater.");
        stdout.push("\tThis will return +false+ if dtr.man has a security level of !3! or less.");
        stdout.push("\tWrap your call of dtr.man in a check of this return. If +true+, go ahead!");
        stdout.push("\tIf +false+, immediately fail your script!");
        stdout.push("\nThis means you no longer have to worry about using other people's scripts in your own!");
        stdout.push("\nFeatures:\n\t- Does not allow nullsec to run\n\t- Phishers blacklisted (typo protection)\n\t- Verifies scripts haven't changed from what you expect\n\t- Trust network coming soon!");
        stdout.push("\n\t\t\t\t\t\t `1::: STAY SAFE AND HAPPY HACKING :::`");
        return stdout;
    }

    var l = #s.scripts.lib();
    var s = args.s;

    var a = l.get_user_from_script(s);

    function checkBlacklist(u) {
        for (var i in blacklist) {
            if (u == blacklist[i]) {
                return true;
            }
        }
    }

    function checkWhitelist(u) {
        for (var i in whitelist) {
            if (u == whitelist[i]) {
                return true;
            }
        }
    }

    var lvl = #s.scripts.get_level({name:args.s});

    if (lvl < args.e) {
        pass = false;
    } else {
        pass = true;
    }

    // don't allow nullsecs to run
    for (var nss in nullsecs) {
        if (nullsecs[nss] == s) {
            pass = false;
        }
    }

    if (checkWhitelist(a)) {
        pass = true;
    }

    if (checkBlacklist(a)) {
        pass = false;
    }

    return pass;
}
