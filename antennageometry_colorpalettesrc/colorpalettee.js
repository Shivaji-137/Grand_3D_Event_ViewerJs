const color_pick = () =>{
        const color  = {
                0: '#FFFFE0',
                1: '#CB410B',
                2: '#4F86F7',
                3: '#C4AEAD',
                4: '#C54B8C',
                5: '#F19CBB',
                6: '#3C341F',
                7: '#A6E7FF',
                8: '#FF33CC',
                9: '#CD607E',
                10: '#BF94E4',
                11: '#E1A95F',
                12: '#FAD6A5',
                13: '#B06500',
                14: '#AA98A9',
                15: '#CC3333',
                16: '#702670',
                17: '#4B5320',
                18: '#F64A8A',
                19: '#722F37',
                20: '#FB9902',
                21: '#CC99FF',
                22: '#1DACD6',
                23: '#F2F0E6',
                24: '#1B1B1B',
                25: '#26619C',
                26: '#32127A',
                27: '#EEE600',
                28: '#F77F00',
                29: '#79443B',
                30: '#FD0E35',
                31: '#2A8000',
                32: '#FFD800',
                33: '#0ABAB5',
                34: '#47ABCC',
                35: '#FF66CC',
                36: '#9E1316',
                37: '#A2006D',
                38: '#DF00FF',
                39: '#86608E',
                40: '#FF3800',
                41: '#2F4F4F',
                42: '#004242',
                43: '#1974D2',
                44: '#556B2F',
                45: '#666699',
                46: '#CC00FF',
                47: '#FFEFD5',
                48: '#7CB9E8',
                49: '#465945',
                50: '#1164B4',
                51: '#CF3476',
                52: '#39FF14',
                53: '#FF5CCD',
                54: '#FF4681',
                55: '#96C8A2',
                56: '#563C5C',
                57: '#F4C430',
                58: '#A95C68',
                59: '#D10047',
                60: '#EE82EE',
                61: '#9F4576',
                62: '#933D41',
                63: '#301934',
                64: '#5D8AA8',
                65: '#DE5D83',
                66: '#006A4E',
                67: '#664C28',
                68: '#CC6666',
                69: '#DE6FA1',
                70: '#FFF0F5',
                71: '#FC5A8D',
                72: '#E66771',
                73: '#811453',
                74: '#7C98AB',
                75: '#F88379',
                76: '#BDB76B',
                77: '#545AA7',
                78: '#FF91AF',
                79: '#534B4F',
                80: '#FFA089',
                81: '#FFC40C',
                82: '#00FFFF',
                83: '#9F00FF',
                84: '#5B92E5',
                85: '#A52A2A',
                86: '#EDC9AF',
                87: '#D1BEA8',
                88: '#A0785A',
                89: '#A17A74',
                90: '#3FFF00',
                91: '#00BFFF',
                92: '#856D4D',
                93: '#FFF700',
                94: '#808080',
                95: '#8B8589',
                96: '#654321',
                97: '#AA98A9',
                98: '#014421',
                99: '#CC0000',
                100: '#F75394',
                101: '#343434',
                102: '#360CCC',
                103: '#A55353',
                104: '#00CCCC',
                105: '#967117',
                106: '#E97451',
                107: '#FAFAD2',
                108: '#FF7F50',
                109: '#00008B',
                110: '#92A1CF',
                111: '#E63E62',
                112: '#F07427',
                113: '#FFFF99',
                114: '#006600',
                115: '#FFAA1D',
                116: '#3399FF',
                117: '#FFD300',
                118: '#FE4164',
                119: '#B784A7',
                120: '#ABCDEF',
                121: '#E52B50',
                122: '#CCFF00',
                123: '#001C3D',
                124: '#9F00C5',
                125: '#99E6B3',
                126: '#808000',
                127: '#C9FFE5',
                128: '#E6E6FA',
                129: '#C41E3A',
                130: '#F0EAD6',
                131: '#1B4D3E',
                132: '#087830',
                133: '#536872',
                134: '#FD3A4A',
                135: '#BCB88A',
                136: '#FEDF00',
                137: '#007F5C',
                138: '#D0417E',
                139: '#F4CA16',
                140: '#FF6347',
                141: '#DA8A67',
                142: '#DA9100',
                143: '#522D80',
                144: '#010B13',
                145: '#FF8243',
                146: '#CEFF00',
                147: '#71BC78',
                148: '#D19FE8',
                149: '#A020F0',
                150: '#D7837F',
                151: '#B31B1B',
                152: '#6E7F80',
                153: '#4682BF',
                154: '#B76E79',
                155: '#E86100',
                156: '#E9967A',
                157: '#FAF0E6',
                158: '#FF55A3',
                159: '#F2BDCD',
                160: '#F4BBFF',
                161: '#F28500',
                162: '#004B49',
                163: '#004F98',
                164: '#006994',
                165: '#FFFFF0',
                166: '#E62020',
                167: '#059033',
                168: '#FC8EAC',
                169: '#D6CADD',
                170: '#BA160C',
                171: '#FF0038',
                172: '#F5FFFA',
                173: '#ADFF2F',
                174: '#9678B6',
                175: '#FF9966',
                176: '#34B233',
                177: '#722F37',
                178: '#D65282',
                179: '#00AB66',
                180: '#FFDF00',
                181: '#C39953',
                182: '#FF5470',
                183: '#3E8EDE',
                184: '#AB4E52',
                185: '#5FA778',
                186: '#FF9999',
                187: '#AE2029',
                188: '#B0BF1A',
                189: '#5946B2',
                190: '#FF007F',
                191: '#512888',
                192: '#CF71AF',
                193: '#FFB347',
                194: '#D0FF14',
                195: '#AEC6CF',
                196: '#A52A2A',
                197: '#56A0D3',
                198: '#645452',
                199: '#9ACD32',
                200: '#1CAC78',
                201: '#0F52BA',
                202: '#FB607F',
                203: '#00147E',
                204: '#3D2B1F',
                205: '#B666D2',
                206: '#996515',
                207: '#A2A2D0',
                208: '#4F666A',
                209: '#FF0090',
                210: '#536878',
                211: '#BB6528',
                212: '#848482',
                213: '#FFA6C9',
                214: '#FF5800',
                215: '#FFBA00',
                216: '#FADA5E',
                217: '#FF9933',
                218: '#FDD9B5',
                219: '#B80CE3',
                220: '#002366',
                221: '#73C2FB',
                222: '#3CD070',
                223: '#669999',
                224: '#B7410E',
                225: '#32174D',
                226: '#5B3256',
                227: '#DBE9F4',
                228: '#CCA01D',
                229: '#483C32',
                230: '#002FA7',
                231: '#701C1C',
                232: '#98777B',
                233: '#FFBCD9',
                234: '#654321',
                235: '#0000FF',
                236: '#39A78E',
                237: '#EF3038',
                238: '#126180',
                239: '#CD7F32',
                240: '#C154C1',
                241: '#FF006C',
                242: '#9457EB',
                243: '#0A7E8C',
                244: '#E3256B',
                245: '#5F8A8B',
                246: '#DB7093',
                247: '#40826D',
                248: '#FFFF66',
                249: '#E3AB57',
                250: '#1560BD',
                251: '#B31B1B',
                252: '#B9F2FF',
                253: '#8B5f4D',
                254: '#009150',
                255: '#3F00FF',
                256: '#EEDC82',
                257: '#D2691E',
                258: '#0093AF',
                259: '#B57EDC',
                260: '#FFB3DE',
                261: '#0067A5',
                262: '#E34234',
                263: '#000000',
                264: '#FF0028',
                265: '#00BFFF',
                266: '#882D17',
                267: '#CD5700',
                268: '#FE2712',
                269: '#1DACD6',
                270: '#4B0082',
                271: '#80461B',
                272: '#003153',
                273: '#391285',
                274: '#FDBCB4',
                275: '#5DA493',
                276: '#49796B',
                277: '#D473D4',
                278: '#FF6961',
                279: '#B3446C',
                280: '#1D2951',
                281: '#FFCBA4',
                282: '#9BC4E2',
                283: '#FCE883',
                284: '#C2B280',
                285: '#B0C4DE',
                286: '#232B2B',
                287: '#FF91A4',
                288: '#D998A0',
                289: '#778899',
                290: '#AC1E44',
                291: '#F400A1',
                292: '#8A3324',
                293: '#69359C',
                294: '#967117',
                295: '#FF3855',
                296: '#B86D29',
                297: '#D4AF37',
                298: '#6D9BC3',
                299: '#FF00FF',
                300: '#FFDAE9',
                301: '#FF6D3A',
                302: '#E32636',
                303: '#E7ACCF',
                304: '#9F2B68',
                305: '#D10056',
                306: '#BFC1C2',
                307: '#F984EF',
                308: '#00563F',
                309: '#FADA5E',
                310: '#AF4035',
                311: '#E3DAC9',
                312: '#BD33A4',
                313: '#FFDB00',
                314: '#006A4E',
                315: '#FFFACD',
                316: '#00CCFF',
                317: '#44D7A8',
                318: '#CC474B',
                319: '#867E36',
                320: '#A67B5B',
                321: '#5E8C31',
                322: '#F0FFFF',
                323: '#FC74FD',
                324: '#EAE0C8',
                325: '#0073CF',
                326: '#F5F5DC',
                327: '#6082B6',
                328: '#E25822',
                329: '#CFB53B',
                330: '#0000CD',
                331: '#008080',
                332: '#9A4EAE',
                333: '#FF404C',
                334: '#BF4F51',
                335: '#91A3B0',
                336: '#74C365',
                337: '#00C5CD',
                338: '#FFDB58',
                339: '#FF8C00',
                340: '#003366',
                341: '#009966',
                342: '#8EE53F',
                343: '#A7F432',
                344: '#F3E5AB',
                345: '#C72C48',
                346: '#FF85CF',
                347: '#4AFF00',
                348: '#F1A7FE',
                349: '#D9004C',
                350: '#007474',
                351: '#F5DEB3',
                352: '#89CFF0',
                353: '#66DDAA',
                354: '#D70040',
                355: '#8B0000',
                356: '#0BDA51',
                357: '#FFFFBF',
                358: '#0247FE',
                359: '#FDD5B1',
                360: '#4F3A3C',
                361: '#FE6F5E',
                362: '#FFBF00',
                363: '#AA381E',
                364: '#FFF000',
                365: '#882D17',
                366: '#FF6FFF',
                367: '#FAD6A5',
                368: '#F4BBFF',
                369: '#6495ED',
                370: '#003399',
                371: '#FFE302',
                372: '#6C3082',
                373: '#E6A8D7',
                374: '#AB274F',
                375: '#4C516D',
                376: '#FBAB60',
                377: '#EE82EE',
                378: '#CC3336',
                379: '#EFBBCC',
                380: '#A9203E',
                381: '#0048BA',
                382: '#8A496B',
                383: '#BF00FF',
                384: '#EFDFBB',
                385: '#918151',
                386: '#FFEB00',
                387: '#77B5FE',
                388: '#242124',
                389: '#1CA9C9',
                390: '#CC397B',
                391: '#4CBB17',
                392: '#FFA700',
                393: '#8B4513',
                394: '#00703C',
                395: '#CA2C92',
                396: '#6F4E37',
                397: '#FFB077',
                398: '#F4C2C2',
                399: '#6EAEA1',
                400: '#FADFAD',
                401: '#DDE26A',
                402: '#354230',
                403: '#ED872D',
                404: '#6B4423',
                405: '#FFD700',
                406: '#8601AF',
                407: '#9400D3',
                408: '#6C2E1F',
                409: '#FFE4E1',
                410: '#FB4F14',
                411: '#0038A8',
                412: '#00A693',
                413: '#DA2C43',
                414: '#367588',
                415: '#FF91AF',
                416: '#F49AC2',
                417: '#FFF600',
                418: '#9B870C',
                419: '#A9A9A9',
                420: '#7FFFD4',
                421: '#87D3F8',
                422: '#273BE2',
                423: '#C9A0DC',
                424: '#1C1CF0',
                425: '#820000',
                426: '#FF6700',
                427: '#006DB0',
                428: '#DCDCDC',
                429: '#C71585',
                430: '#483C32',
                431: '#21ABCD',
                432: '#F6EABE',
                433: '#8F9779',
                434: '#E8F48C',
                435: '#CC0033',
                436: '#676767',
                437: '#007AA5',
                438: '#100C08',
                439: '#FFA500',
                440: '#746CC0',
                441: '#ED1C24',
                442: '#C154C1',
                443: '#00A550',
                444: '#702963',
                445: '#850101',
                446: '#FADADD',
                447: '#59260B',
                448: '#BEBEBE',
                449: '#45B1E8',
                450: '#FF003F',
                451: '#ED2939',
                452: '#FFC1CC',
                453: '#CC7722',
                454: '#BA55D3',
                455: '#FFE5B4',
                456: '#F0DC82',
                457: '#6F2DA8',
                458: '#93CCEA',
                459: '#E08D3C',
                460: '#E8CCD7',
                461: '#ACBF60',
                462: '#008B8B',
                463: '#15F2FD',
                464: '#C80815',
                465: '#DEAA88',
                466: '#177245',
                467: '#ACACAC',
                468: '#A45A52',
                469: '#E5AA70',
                470: '#5DADEC',
                471: '#4C9141',
                472: '#800020',
                473: '#A81C07',
                474: '#00FFFF',
                475: '#FFCC99',
                476: '#FFEBCD',
                477: '#D92121',
                478: '#DDA0DD',
                479: '#0018A8',
                480: '#C9C0BB',
                481: '#D71868',
                482: '#F984E5',
                483: '#AE98AA',
                484: '#8A9A5B',
                485: '#A6D608',
                486: '#808080',
                487: '#A7FC00',
                488: '#8D4E85',
                489: '#D3D3D3',
                490: '#C8A2C8',
                491: '#4E5180',
                492: '#444C38',
                493: '#873260',
                494: '#C04000',
                495: '#E5B73B',
                496: '#AA00BB',
                497: '#F2F27A',
                498: '#8A7F80',
                499: '#A2ADD0',
                500: '#0E7C61',
        };
        return color;
};  

