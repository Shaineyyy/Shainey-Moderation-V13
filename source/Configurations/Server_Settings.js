module.exports = {
    guildID: "Sunucu_ID",

    Roles: { 

        Staff: {
            banHammer:"Ban_Yetki_ID",
            jailHammer:"Jail_Yetki_ID",
            muteHammer:"Mute_Yetki_ID",
            registerHammer:"Kayıt_Yetki_ID",
            lowerStaff:"En_Alt_Yetki_ID",

            botCommand:"Bot_Komut_Yetki_ID"
        },

        Member: {
            unregisteredRole:"Kayıtsız_Rol_ID",
            suspectRole:"Şüpheli_Rol_ID",
            manRoles:["Erkek_Rol_ID1","Erkek_Rol_ID2"],
            womanRoles:["Kadın_Rol_ID1","Kadın_Rol_ID2"],

            boosterRole:"Booster_Rol_ID",
            vipRole:"Vip_Rol_ID",
            tagRole:"Tag_Rol_ID",

            jailRole:"Jail_Rol_ID",
            MutedRole:"Mute_Rol_ID",
            VoiceMuted:"SesMute_Rol_ID",

            Designer:"Tasarımcı_Rol_ID",
            Musician:"Müzisyen_Rol_ID",
            Streamer:"Yayıncı_Rol_ID",
        }

    },

    Channels: {
        rulesChannel:"Kural_Kanal_ID",
        inviteChannel:"Davet_Kanal_ID",
        suspectChannel:"Şühepli_Kanal_ID",
        registerChannel:"Kayıt_Kanal_ID",

        banLogChannel:"Ban_Kanal_ID",
        jailLogChannel:"Jail_Kanal_ID",
        muteLogChannel:"Mute_Kanal_ID",

        messageLogChannel:"MesajLog_Kanal_ID",
        chatChannel:"Chat_Kanal_ID",
        tagLogChannel:"TagLog_Kanal_ID",

        afkVoice:"Afk_Kanal_ID"
    },

    Others: {

        Emojis: {
            check:"Tik_Emoji",
            reject:"Çarpı_Emoji"
        },

        Tag: {
            All:[],
            nameTag:[],
            discTag:"",
            secondaryTag:"•"
        },

        unregisteredName:"• Kayıtsız",

        Acts: {
            giveaway:"",
            activity:""
        },

        Points: {
            Mute:"20",
            VMute:"10",
            Jail:"30",
            Ban:"50"
        }

    }
 }