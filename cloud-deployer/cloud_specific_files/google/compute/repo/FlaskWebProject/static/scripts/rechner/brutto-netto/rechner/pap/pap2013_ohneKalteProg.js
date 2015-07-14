define(['./helper/BigDecimal', './helper/BigDecimalConst'], function (BigDecimal, BigDecimalConst) {
  return function Lohnsteuer2013() {

    // VARIABLES ======================================
    this.af = 1.0; // input vars
    this.AJAHR = 0; // input vars
    this.ALTER1 = 0; // input vars
    this.ENTSCH = new BigDecimal(0); // input vars
    this.f = 1.0; // input vars
    this.JFREIB = new BigDecimal(0); // input vars
    this.JHINZU = new BigDecimal(0); // input vars
    this.JRE4 = new BigDecimal(0); // input vars
    this.JVBEZ = new BigDecimal(0); // input vars
    this.KRV = 0; // input vars
    this.LZZ = 1; // input vars
    this.LZZFREIB = new BigDecimal(0); // input vars
    this.LZZHINZU = new BigDecimal(0); // input vars
    this.PKPV = new BigDecimal(0); // input vars
    this.PKV = 0; // input vars
    this.PVS = 0; // input vars
    this.PVZ = 0; // input vars
    this.R = 0; // input vars
    this.RE4 = new BigDecimal(1); // input vars
    this.SONSTB = new BigDecimal(0); // input vars
    this.STERBE = new BigDecimal(0); // input vars
    this.STKL = 1; // input vars
    this.VBEZ = new BigDecimal(0); // input vars
    this.VBEZM = new BigDecimal(0); // input vars
    this.VBEZS = new BigDecimal(0); // input vars
    this.VBS = new BigDecimal(0); // input vars
    this.VJAHR = 0; // input vars
    this.VKAPA = new BigDecimal(0); // input vars
    this.VMT = new BigDecimal(0); // input vars
    this.ZKF = new BigDecimal(0); // input vars
    this.ZMVB = 0; // input vars
    this.JRE4ENT = BigDecimalConst.ZERO; // input vars
    this.SONSTENT = BigDecimalConst.ZERO; // input vars
    this.BK = new BigDecimal(0); // output vars
    this.BKS = new BigDecimal(0); // output vars
    this.BKV = new BigDecimal(0); // output vars
    this.LSTLZZ = new BigDecimal(0); // output vars
    this.SOLZLZZ = new BigDecimal(0); // output vars
    this.SOLZS = new BigDecimal(0); // output vars
    this.SOLZV = new BigDecimal(0); // output vars
    this.STS = new BigDecimal(0); // output vars
    this.STV = new BigDecimal(0); // output vars
    this.zveEkSt = new BigDecimal(0); // internal vars
    this.zveGemeinsam = new BigDecimal(0); // internal vars
    this.ALTE = new BigDecimal(0); // internal vars
    this.ANP = new BigDecimal(0); // internal vars
    this.ANTEIL1 = new BigDecimal(0); // internal vars
    this.BMG = new BigDecimal(0); // internal vars
    this.DIFF = new BigDecimal(0); // internal vars
    this.EFA = new BigDecimal(0); // internal vars
    this.FVB = new BigDecimal(0); // internal vars
    this.FVBSO = new BigDecimal(0); // internal vars
    this.FVBZ = new BigDecimal(0); // internal vars
    this.FVBZSO = new BigDecimal(0); // internal vars
    this.HBALTE = new BigDecimal(0); // internal vars
    this.HFVB = new BigDecimal(0); // internal vars
    this.HFVBZ = new BigDecimal(0); // internal vars
    this.HFVBZSO = new BigDecimal(0); // internal vars
    this.J = 0; // internal vars
    this.JBMG = new BigDecimal(0); // internal vars
    this.JLFREIB = new BigDecimal(0); // internal vars
    this.JLHINZU = new BigDecimal(0); // internal vars
    this.JW = new BigDecimal(0); // internal vars
    this.K = 0; // internal vars
    this.KENNVMT = 0; // internal vars
    this.KFB = new BigDecimal(0); // internal vars
    this.KVSATZAG = new BigDecimal(0); // internal vars
    this.KVSATZAN = new BigDecimal(0); // internal vars
    this.KZTAB = 0; // internal vars
    this.LSTJAHR = new BigDecimal(0); // internal vars
    this.LST1 = new BigDecimal(0); // internal vars
    this.LST2 = new BigDecimal(0); // internal vars
    this.LST3 = new BigDecimal(0); // internal vars
    this.LSTOSO = new BigDecimal(0); // internal vars
    this.LSTSO = new BigDecimal(0); // internal vars
    this.MIST = new BigDecimal(0); // internal vars
    this.PVSATZAG = new BigDecimal(0); // internal vars
    this.PVSATZAN = new BigDecimal(0); // internal vars
    this.RW = new BigDecimal(0); // internal vars
    this.SAP = new BigDecimal(0); // internal vars
    this.SOLZFREI = new BigDecimal(0); // internal vars
    this.SOLZJ = new BigDecimal(0); // internal vars
    this.SOLZMIN = new BigDecimal(0); // internal vars
    this.ST = new BigDecimal(0); // internal vars
    this.ST1 = new BigDecimal(0); // internal vars
    this.ST2 = new BigDecimal(0); // internal vars
    this.STOVMT = new BigDecimal(0); // internal vars
    this.VBEZB = new BigDecimal(0); // internal vars
    this.VBEZBSO = new BigDecimal(0); // internal vars
    this.VHB = new BigDecimal(0); // internal vars
    this.VSP = new BigDecimal(0); // internal vars
    this.VSPN = new BigDecimal(0); // internal vars
    this.VSP1 = new BigDecimal(0); // internal vars
    this.VSP2 = new BigDecimal(0); // internal vars
    this.VSP3 = new BigDecimal(0); // internal vars
    this.VSPKURZ = new BigDecimal(0); // internal vars
    this.VSPMAX1 = new BigDecimal(0); // internal vars
    this.VSPMAX2 = new BigDecimal(0); // internal vars
    this.VSPO = new BigDecimal(0); // internal vars
    this.VSPREST = new BigDecimal(0); // internal vars
    this.VSPVOR = new BigDecimal(0); // internal vars
    this.X = new BigDecimal(0); // internal vars
    this.Y = new BigDecimal(0); // internal vars
    this.ZRE4 = new BigDecimal(0); // internal vars
    this.ZRE4J = new BigDecimal(0); // internal vars
    this.ZRE4VP = new BigDecimal(0); // internal vars
    this.ZTABFB = new BigDecimal(0); // internal vars
    this.ZVBEZ = new BigDecimal(0); // internal vars
    this.ZVBEZJ = new BigDecimal(0); // internal vars
    this.ZVE = new BigDecimal(0); // internal vars
    this.ZX = new BigDecimal(0); // internal vars
    this.ZZX = new BigDecimal(0); // internal vars
    this.HOCH = new BigDecimal(0); // internal vars
    this.VERGL = new BigDecimal(0); // internal vars
    this.VKV = new BigDecimal(0); // internal vars
    this.VKVLZZ = new BigDecimal(0); // internal vars
    this.VKVSONST = new BigDecimal(0); // internal vars

    // CONSTANTS ======================================
    this.TAB1 = [BigDecimalConst.valueOf(0.0),
      BigDecimalConst.valueOf(0.4),
      BigDecimalConst.valueOf(0.384),
      BigDecimalConst.valueOf(0.368),
      BigDecimalConst.valueOf(0.352),
      BigDecimalConst.valueOf(0.336),
      BigDecimalConst.valueOf(0.32),
      BigDecimalConst.valueOf(0.304),
      BigDecimalConst.valueOf(0.288),
      BigDecimalConst.valueOf(0.272),
      BigDecimalConst.valueOf(0.256),
      BigDecimalConst.valueOf(0.24),
      BigDecimalConst.valueOf(0.224),
      BigDecimalConst.valueOf(0.208),
      BigDecimalConst.valueOf(0.192),
      BigDecimalConst.valueOf(0.176),
      BigDecimalConst.valueOf(0.16),
      BigDecimalConst.valueOf(0.152),
      BigDecimalConst.valueOf(0.144),
      BigDecimalConst.valueOf(0.136),
      BigDecimalConst.valueOf(0.128),
      BigDecimalConst.valueOf(0.12),
      BigDecimalConst.valueOf(0.112),
      BigDecimalConst.valueOf(0.104),
      BigDecimalConst.valueOf(0.096),
      BigDecimalConst.valueOf(0.088),
      BigDecimalConst.valueOf(0.08),
      BigDecimalConst.valueOf(0.072),
      BigDecimalConst.valueOf(0.064),
      BigDecimalConst.valueOf(0.056),
      BigDecimalConst.valueOf(0.048),
      BigDecimalConst.valueOf(0.04),
      BigDecimalConst.valueOf(0.032),
      BigDecimalConst.valueOf(0.024),
      BigDecimalConst.valueOf(0.016),
      BigDecimalConst.valueOf(0.008),
      BigDecimalConst.valueOf(0.0)
    ]; // CONSTAT
    this.TAB2 = [BigDecimalConst.valueOf(0),
      BigDecimalConst.valueOf(3000),
      BigDecimalConst.valueOf(2880),
      BigDecimalConst.valueOf(2760),
      BigDecimalConst.valueOf(2640),
      BigDecimalConst.valueOf(2520),
      BigDecimalConst.valueOf(2400),
      BigDecimalConst.valueOf(2280),
      BigDecimalConst.valueOf(2160),
      BigDecimalConst.valueOf(2040),
      BigDecimalConst.valueOf(1920),
      BigDecimalConst.valueOf(1800),
      BigDecimalConst.valueOf(1680),
      BigDecimalConst.valueOf(1560),
      BigDecimalConst.valueOf(1440),
      BigDecimalConst.valueOf(1320),
      BigDecimalConst.valueOf(1200),
      BigDecimalConst.valueOf(1140),
      BigDecimalConst.valueOf(1080),
      BigDecimalConst.valueOf(1020),
      BigDecimalConst.valueOf(960),
      BigDecimalConst.valueOf(900),
      BigDecimalConst.valueOf(840),
      BigDecimalConst.valueOf(780),
      BigDecimalConst.valueOf(720),
      BigDecimalConst.valueOf(660),
      BigDecimalConst.valueOf(600),
      BigDecimalConst.valueOf(540),
      BigDecimalConst.valueOf(480),
      BigDecimalConst.valueOf(420),
      BigDecimalConst.valueOf(360),
      BigDecimalConst.valueOf(300),
      BigDecimalConst.valueOf(240),
      BigDecimalConst.valueOf(180),
      BigDecimalConst.valueOf(120),
      BigDecimalConst.valueOf(60), BigDecimalConst.valueOf(0)
    ]; // CONSTAT
    this.TAB3 = [BigDecimalConst.valueOf(0),
      BigDecimalConst.valueOf(900),
      BigDecimalConst.valueOf(864),
      BigDecimalConst.valueOf(828),
      BigDecimalConst.valueOf(792),
      BigDecimalConst.valueOf(756),
      BigDecimalConst.valueOf(720),
      BigDecimalConst.valueOf(684),
      BigDecimalConst.valueOf(648),
      BigDecimalConst.valueOf(612),
      BigDecimalConst.valueOf(576),
      BigDecimalConst.valueOf(540),
      BigDecimalConst.valueOf(504),
      BigDecimalConst.valueOf(468),
      BigDecimalConst.valueOf(432),
      BigDecimalConst.valueOf(396),
      BigDecimalConst.valueOf(360),
      BigDecimalConst.valueOf(342),
      BigDecimalConst.valueOf(324),
      BigDecimalConst.valueOf(306),
      BigDecimalConst.valueOf(288),
      BigDecimalConst.valueOf(270),
      BigDecimalConst.valueOf(252),
      BigDecimalConst.valueOf(234),
      BigDecimalConst.valueOf(216),
      BigDecimalConst.valueOf(198),
      BigDecimalConst.valueOf(180),
      BigDecimalConst.valueOf(162),
      BigDecimalConst.valueOf(144),
      BigDecimalConst.valueOf(126),
      BigDecimalConst.valueOf(108),
      BigDecimalConst.valueOf(90),
      BigDecimalConst.valueOf(72),
      BigDecimalConst.valueOf(54),
      BigDecimalConst.valueOf(36),
      BigDecimalConst.valueOf(18), BigDecimalConst.valueOf(0)
    ]; // CONSTAT
    this.TAB4 = [BigDecimalConst.valueOf(0.0),
      BigDecimalConst.valueOf(0.4),
      BigDecimalConst.valueOf(0.384),
      BigDecimalConst.valueOf(0.368),
      BigDecimalConst.valueOf(0.352),
      BigDecimalConst.valueOf(0.336),
      BigDecimalConst.valueOf(0.32),
      BigDecimalConst.valueOf(0.304),
      BigDecimalConst.valueOf(0.288),
      BigDecimalConst.valueOf(0.272),
      BigDecimalConst.valueOf(0.256),
      BigDecimalConst.valueOf(0.24),
      BigDecimalConst.valueOf(0.224),
      BigDecimalConst.valueOf(0.208),
      BigDecimalConst.valueOf(0.192),
      BigDecimalConst.valueOf(0.176),
      BigDecimalConst.valueOf(0.16),
      BigDecimalConst.valueOf(0.152),
      BigDecimalConst.valueOf(0.144),
      BigDecimalConst.valueOf(0.136),
      BigDecimalConst.valueOf(0.128),
      BigDecimalConst.valueOf(0.12),
      BigDecimalConst.valueOf(0.112),
      BigDecimalConst.valueOf(0.104),
      BigDecimalConst.valueOf(0.096),
      BigDecimalConst.valueOf(0.088),
      BigDecimalConst.valueOf(0.08),
      BigDecimalConst.valueOf(0.072),
      BigDecimalConst.valueOf(0.064),
      BigDecimalConst.valueOf(0.056),
      BigDecimalConst.valueOf(0.048),
      BigDecimalConst.valueOf(0.04),
      BigDecimalConst.valueOf(0.032),
      BigDecimalConst.valueOf(0.024),
      BigDecimalConst.valueOf(0.016),
      BigDecimalConst.valueOf(0.008),
      BigDecimalConst.valueOf(0.0)
    ]; // CONSTAT
    this.TAB5 = [BigDecimalConst.valueOf(0),
      BigDecimalConst.valueOf(1900),
      BigDecimalConst.valueOf(1824),
      BigDecimalConst.valueOf(1748),
      BigDecimalConst.valueOf(1672),
      BigDecimalConst.valueOf(1596),
      BigDecimalConst.valueOf(1520),
      BigDecimalConst.valueOf(1444),
      BigDecimalConst.valueOf(1368),
      BigDecimalConst.valueOf(1292),
      BigDecimalConst.valueOf(1216),
      BigDecimalConst.valueOf(1140),
      BigDecimalConst.valueOf(1064),
      BigDecimalConst.valueOf(988),
      BigDecimalConst.valueOf(912),
      BigDecimalConst.valueOf(836),
      BigDecimalConst.valueOf(760),
      BigDecimalConst.valueOf(722),
      BigDecimalConst.valueOf(684),
      BigDecimalConst.valueOf(646),
      BigDecimalConst.valueOf(608),
      BigDecimalConst.valueOf(570),
      BigDecimalConst.valueOf(532),
      BigDecimalConst.valueOf(494),
      BigDecimalConst.valueOf(456),
      BigDecimalConst.valueOf(418),
      BigDecimalConst.valueOf(380),
      BigDecimalConst.valueOf(342),
      BigDecimalConst.valueOf(304),
      BigDecimalConst.valueOf(266),
      BigDecimalConst.valueOf(228),
      BigDecimalConst.valueOf(190),
      BigDecimalConst.valueOf(152),
      BigDecimalConst.valueOf(114),
      BigDecimalConst.valueOf(76),
      BigDecimalConst.valueOf(38), BigDecimalConst.valueOf(0)
    ]; // CONSTAT
    this.ZAHL0 = BigDecimalConst.ZERO; // CONSTAT
    this.ZAHL1 = BigDecimalConst.ONE; // CONSTAT
    this.ZAHL2 = new BigDecimal(2); // CONSTAT
    this.ZAHL3 = new BigDecimal(3); // CONSTAT
    this.ZAHL4 = new BigDecimal(4); // CONSTAT
    this.ZAHL5 = new BigDecimal(5); // CONSTAT
    this.ZAHL6 = new BigDecimal(6); // CONSTAT
    this.ZAHL7 = new BigDecimal(7); // CONSTAT
    this.ZAHL8 = new BigDecimal(8); // CONSTAT
    this.ZAHL9 = new BigDecimal(9); // CONSTAT
    this.ZAHL10 = BigDecimalConst.TEN; // CONSTAT
    this.ZAHL11 = new BigDecimal(11); // CONSTAT
    this.ZAHL12 = new BigDecimal(12); // CONSTAT
    this.ZAHL100 = new BigDecimal(100); // CONSTAT
    this.ZAHL360 = new BigDecimal(360); // CONSTAT
    this.ZAHL500 = new BigDecimal(500); // CONSTAT
    this.ZAHL700 = new BigDecimal(700); // CONSTAT
    this.ZAHL1000 = new BigDecimal(1000); // CONSTAT
    this.RENTBEMESSUNGSGR_OST_2013 = new BigDecimal(58800); // CONSTAT
    this.RENTBEMESSUNGSGR_WEST = new BigDecimal(69600); // CONSTAT

    // ************ call this to calculate ************
    this.main = function () {

      this.MRE4JL();
      this.VBEZBSO = BigDecimalConst.ZERO;
      this.KENNVMT = 0;

      this.MRE4();

      this.MRE4ABZ();

      this.MZTABFB();

      this.MLSTJAHR();
      this.LSTJAHR = this.ST.multiply(
        BigDecimalConst.valueOf(this.f))
        .setScale(0,
          BigDecimalConst.ROUND_DOWN);
      this.JW = this.LSTJAHR.multiply(this.ZAHL100);

      this.UPLSTLZZ();

      this.UPVKVLZZ();

      if (this.ZKF.compareTo(BigDecimalConst.ZERO) == 1) {
        this.ZTABFB = (this.ZTABFB.add(this.KFB))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);

        this.MRE4ABZ();

        this.MLSTJAHR();
        this.JBMG = this.ST.multiply(
          BigDecimalConst.valueOf(this.f))
          .setScale(0,
            BigDecimalConst.ROUND_DOWN);

      }
      else {
        this.JBMG = this.LSTJAHR;

      }
      this.MSOLZ();

      this.MSONST();

      this.MVMT();

    };
    // ************ call this to calculate ************

    this.MRE4JL = function () {

      if (this.LZZ == 1) {
        this.ZRE4J = this.RE4.divide(this.ZAHL100, 2,
          BigDecimalConst.ROUND_DOWN);
        this.ZVBEZJ = this.VBEZ.divide(this.ZAHL100, 2,
          BigDecimalConst.ROUND_DOWN);
        this.JLFREIB = this.LZZFREIB.divide(this.ZAHL100, 2,
          BigDecimalConst.ROUND_DOWN);
        this.JLHINZU = this.LZZHINZU.divide(this.ZAHL100, 2,
          BigDecimalConst.ROUND_DOWN);

      }
      else {

        if (this.LZZ == 2) {
          this.ZRE4J = (this.RE4.multiply(this.ZAHL12))
            .divide(this.ZAHL100, 2,
              BigDecimalConst.ROUND_DOWN);
          this.ZVBEZJ = (this.VBEZ.multiply(this.ZAHL12))
            .divide(this.ZAHL100, 2,
              BigDecimalConst.ROUND_DOWN);
          this.JLFREIB = (this.LZZFREIB.multiply(this.ZAHL12))
            .divide(this.ZAHL100, 2,
              BigDecimalConst.ROUND_DOWN);
          this.JLHINZU = (this.LZZHINZU.multiply(this.ZAHL12))
            .divide(this.ZAHL100, 2,
              BigDecimalConst.ROUND_DOWN);

        }
        else {

          if (this.LZZ == 3) {
            this.ZRE4J = (this.RE4.multiply(this.ZAHL360))
              .divide(this.ZAHL700, 2,
                BigDecimalConst.ROUND_DOWN);
            this.ZVBEZJ = (this.VBEZ.multiply(this.ZAHL360))
              .divide(this.ZAHL700, 2,
                BigDecimalConst.ROUND_DOWN);
            this.JLFREIB = (this.LZZFREIB
              .multiply(this.ZAHL360))
              .divide(
                this.ZAHL700, 2,
                BigDecimalConst.ROUND_DOWN);
            this.JLHINZU = (this.LZZHINZU
              .multiply(this.ZAHL360))
              .divide(
                this.ZAHL700, 2,
                BigDecimalConst.ROUND_DOWN);

          }
          else {
            this.ZRE4J = (this.RE4.multiply(this.ZAHL360))
              .divide(this.ZAHL100, 2,
                BigDecimalConst.ROUND_DOWN);
            this.ZVBEZJ = (this.VBEZ.multiply(this.ZAHL360))
              .divide(this.ZAHL100, 2,
                BigDecimalConst.ROUND_DOWN);
            this.JLFREIB = (this.LZZFREIB
              .multiply(this.ZAHL360))
              .divide(
                this.ZAHL100, 2,
                BigDecimalConst.ROUND_DOWN);
            this.JLHINZU = (this.LZZHINZU
              .multiply(this.ZAHL360))
              .divide(
                this.ZAHL100, 2,
                BigDecimalConst.ROUND_DOWN);

          }
        }
      }

      if (this.af == 0) {
        this.f = 1;

      }
    };

    this.MRE4 = function () {

      if (this.ZVBEZJ.compareTo(BigDecimalConst.ZERO) == 0) {
        this.FVBZ = BigDecimalConst.ZERO;
        this.FVB = BigDecimalConst.ZERO;
        this.FVBZSO = BigDecimalConst.ZERO;
        this.FVBSO = BigDecimalConst.ZERO;

      }
      else {

        if (this.VJAHR < 2006) {
          this.J = 1;

        }
        else {

          if (this.VJAHR < 2040) {
            this.J = this.VJAHR - 2004;

          }
          else {
            this.J = 36;

          }
        }

        if (this.LZZ == 1) {
          this.VBEZB = (this.VBEZM.multiply(BigDecimalConst
            .valueOf(this.ZMVB)))
            .add(this.VBEZS);
          this.HFVB = this.TAB2[this.J].divide(this.ZAHL12)
            .multiply(
              BigDecimalConst.valueOf(this.ZMVB));
          this.FVBZ = this.TAB3[this.J].divide(this.ZAHL12)
            .multiply(
              BigDecimalConst.valueOf(this.ZMVB))
            .setScale(0, BigDecimalConst.ROUND_UP);

        }
        else {
          this.VBEZB = ((this.VBEZM.multiply(this.ZAHL12))
            .add(this.VBEZS))
            .setScale(2,
              BigDecimalConst.ROUND_DOWN);
          this.HFVB = this.TAB2[this.J];
          this.FVBZ = this.TAB3[this.J];

        }
        this.FVB = ((this.VBEZB.multiply(this.TAB1[this.J])))
          .divide(this.ZAHL100)
          .setScale(2,
            BigDecimalConst.ROUND_UP);

        if (this.FVB.compareTo(this.HFVB) == 1) {
          this.FVB = this.HFVB;

        }
        this.FVBSO = (this.FVB.add((this.VBEZBSO
            .multiply(this.TAB1[this.J]))
          .divide(this.ZAHL100)))
          .setScale(2,
            BigDecimalConst.ROUND_UP);

        if (this.FVBSO.compareTo(this.TAB2[this.J]) == 1) {
          this.FVBSO = this.TAB2[this.J];

        }
        this.HFVBZSO = (((this.VBEZB.add(this.VBEZBSO))
            .divide(this.ZAHL100))
          .subtract(this.FVBSO))
          .setScale(2, BigDecimalConst.ROUND_DOWN);
        this.FVBZSO = (this.FVBZ.add((this.VBEZBSO)
          .divide(this.ZAHL100)))
          .setScale(0,
            BigDecimalConst.ROUND_UP);

        if (this.FVBZSO.compareTo(this.HFVBZSO) == 1) {
          this.FVBZSO = this.HFVBZSO.setScale(0,
            BigDecimalConst.ROUND_UP);

        }

        if (this.FVBZSO.compareTo(this.TAB3[this.J]) == 1) {
          this.FVBZSO = this.TAB3[this.J];

        }
        this.HFVBZ = ((this.VBEZB.divide(this.ZAHL100))
          .subtract(this.FVB))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);

        if (this.FVBZ.compareTo(this.HFVBZ) == 1) {
          this.FVBZ = this.HFVBZ.setScale(0,
            BigDecimalConst.ROUND_UP);

        }
      }
      this.MRE4ALTE();

    };

    this.MRE4ALTE = function () {

      if (this.ALTER1 == 0) {
        this.ALTE = BigDecimalConst.ZERO;

      }
      else {

        if (this.AJAHR < 2006) {
          this.K = 1;

        }
        else {

          if (this.AJAHR < 2040) {
            this.K = this.AJAHR - 2004;

          }
          else {
            this.K = 36;

          }
        }
        this.BMG = this.ZRE4J.subtract(this.ZVBEZJ);
        this.ALTE = (this.BMG.multiply(this.TAB4[this.K]))
          .setScale(0, BigDecimalConst.ROUND_UP);
        this.HBALTE = this.TAB5[this.K];

        if (this.ALTE.compareTo(this.HBALTE) == 1) {
          this.ALTE = this.HBALTE;

        }
      }
    };

    this.MRE4ABZ = function () {
      this.ZRE4 = (this.ZRE4J.subtract(this.FVB)
        .subtract(
          this.ALTE)
        .subtract(this.JLFREIB)
        .add(this.JLHINZU))
        .setScale(2, BigDecimalConst.ROUND_DOWN);

      if (this.ZRE4.compareTo(BigDecimalConst.ZERO) == -1) {
        this.ZRE4 = BigDecimalConst.ZERO;

      }
      this.ZRE4VP = this.ZRE4J;

      if (this.KENNVMT == 2) {
        this.ZRE4VP = this.ZRE4VP.subtract(
          this.ENTSCH.divide(this.ZAHL100))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);

      }
      this.ZVBEZ = this.ZVBEZJ.subtract(this.FVB)
        .setScale(2,
          BigDecimalConst.ROUND_DOWN);

      if (this.ZVBEZ.compareTo(BigDecimalConst.ZERO) == -1) {
        this.ZVBEZ = BigDecimalConst.ZERO;

      }
    };

    this.MZTABFB = function () {
      this.ANP = BigDecimalConst.ZERO;

      if (this.ZVBEZ.compareTo(BigDecimalConst.ZERO) >= 0 && this.ZVBEZ.compareTo(this.FVBZ) == -1) {
        this.FVBZ = BigDecimalConst.valueOf(this.ZVBEZ
          .longValue());

      }

      if (this.STKL < 6) {

        if (this.ZVBEZ.compareTo(BigDecimalConst.ZERO) == 1) {

          if ((this.ZVBEZ.subtract(this.FVBZ))
            .compareTo(BigDecimalConst.valueOf(102)) == -1) {
            this.ANP = (this.ZVBEZ.subtract(this.FVBZ))
              .setScale(0, BigDecimalConst.ROUND_UP);

          }
          else {
            this.ANP = BigDecimalConst.valueOf(102);

          }
        }
      }
      else {
        this.FVBZ = BigDecimalConst.valueOf(0);
        this.FVBZSO = BigDecimalConst.valueOf(0);

      }

      if (this.STKL < 6) {

        if (this.ZRE4.compareTo(this.ZVBEZ) == 1) {

          if (this.ZRE4.subtract(this.ZVBEZ)
            .compareTo(
              this.ZAHL1000) == -1) {
            this.ANP = this.ANP.add(this.ZRE4)
              .subtract(
                this.ZVBEZ)
              .setScale(0,
                BigDecimalConst.ROUND_UP);

          }
          else {
            this.ANP = this.ANP.add(this.ZAHL1000);

          }
        }
      }
      this.KZTAB = 1;

      if (this.STKL == 1) {
        this.SAP = BigDecimalConst.valueOf(36);
        this.KFB = (this.ZKF.multiply(BigDecimalConst
          .valueOf(7008)))
          .setScale(0,
            BigDecimalConst.ROUND_DOWN);

      }
      else {

        if (this.STKL == 2) {
          this.EFA = BigDecimalConst.valueOf(1308);
          this.SAP = BigDecimalConst.valueOf(36);
          this.KFB = (this.ZKF.multiply(BigDecimalConst
            .valueOf(7008)))
            .setScale(0,
              BigDecimalConst.ROUND_DOWN);

        }
        else {

          if (this.STKL == 3) {
            this.KZTAB = 2;
            this.SAP = BigDecimalConst.valueOf(36);
            this.KFB = (this.ZKF.multiply(BigDecimalConst
              .valueOf(7008)))
              .setScale(0,
                BigDecimalConst.ROUND_DOWN);

          }
          else {

            if (this.STKL == 4) {
              this.SAP = BigDecimalConst.valueOf(36);
              this.KFB = (this.ZKF
                .multiply(BigDecimalConst
                  .valueOf(3504)))
                .setScale(
                  0, BigDecimalConst.ROUND_DOWN);

            }
            else {

              if (this.STKL == 5) {
                this.SAP = BigDecimalConst.valueOf(36);
                this.KFB = BigDecimalConst.ZERO;

              }
              else {
                this.KFB = BigDecimalConst.ZERO;

              }
            }
          }
        }
      }
      this.ZTABFB = (this.EFA.add(this.ANP)
        .add(this.SAP)
        .add(this.FVBZ))
        .setScale(2,
          BigDecimalConst.ROUND_DOWN);

    };

    this.MLSTJAHR = function () {

      this.UPEVP();

      if (this.KENNVMT != 1) {
        this.ZVE = (this.ZRE4.subtract(this.ZTABFB)
          .subtract(this.VSP))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);

        this.UPMLST();

      }
      else {
        this.ZVE = (this.ZRE4.subtract(this.ZTABFB)
          .subtract(
            this.VSP)
          .subtract(
            (this.VMT)
            .divide(this.ZAHL100))
          .subtract((this.VKAPA)
            .divide(this.ZAHL100)))
          .setScale(2, BigDecimalConst.ROUND_DOWN);

        if (this.ZVE.compareTo(BigDecimalConst.ZERO) == -1) {
          this.ZVE = this.ZVE.add(
            this.VMT.divide(this.ZAHL100))
            .add(
              this.VKAPA.divide(this.ZAHL100))
            .divide(
              this.ZAHL5)
            .setScale(2,
              BigDecimalConst.ROUND_DOWN);

          this.UPMLST();
          this.ST = (this.ST.multiply(this.ZAHL5))
            .setScale(
              0, BigDecimalConst.ROUND_DOWN);

        }
        else {

          this.UPMLST();
          this.STOVMT = this.ST;
          this.ZVE = (this.ZVE
            .add(((this.VMT.add(this.VKAPA))
              .divide(this.ZAHL500))))
            .setScale(
              2, BigDecimalConst.ROUND_DOWN);

          this.UPMLST();
          this.ST = (((this.ST.subtract(this.STOVMT))
              .multiply(this.ZAHL5))
            .add(this.STOVMT))
            .setScale(0, BigDecimalConst.ROUND_DOWN);

        }
      }
    };

    this.UPVKVLZZ = function () {

      this.UPVKV();
      this.JW = this.VKV;

      this.UPANTEIL();
      this.VKVLZZ = this.ANTEIL1;

    };

    this.UPVKV = function () {

      if (this.PKV > 0) {

        if (this.VSP2.compareTo(this.VSP3) == 1) {
          this.VKV = this.VSP2.multiply(this.ZAHL100);

        }
        else {
          this.VKV = this.VSP3.multiply(this.ZAHL100);

        }
      }
      else {
        this.VKV = BigDecimalConst.ZERO;

      }
    };

    this.UPLSTLZZ = function () {
      this.JW = this.LSTJAHR.multiply(this.ZAHL100);

      this.UPANTEIL();
      this.LSTLZZ = this.ANTEIL1;

    };

    this.UPMLST = function () {

      if (this.ZVE.compareTo(this.ZAHL1) == -1) {
        this.ZVE = BigDecimalConst.ZERO;
        this.X = BigDecimalConst.ZERO;

      }
      else {
        this.X = (this.ZVE.divide(BigDecimalConst
          .valueOf(this.KZTAB)))
          .setScale(0,
            BigDecimalConst.ROUND_DOWN);

      }

      if (this.STKL < 5) {

        this.UPTAB10();

      }
      else {

        this.MST5_6();

      }
    };

    this.UPEVP = function () {

      if (this.KRV > 1) {
        this.VSP1 = BigDecimalConst.ZERO;

      }
      else {

        if (this.KRV == 0) {

          if (this.ZRE4VP
            .compareTo(this.RENTBEMESSUNGSGR_WEST) == 1) {
            this.ZRE4VP = this.RENTBEMESSUNGSGR_WEST;

          }
        }
        else {

          if (this.ZRE4VP
            .compareTo(this.RENTBEMESSUNGSGR_OST_2013) == 1) {
            this.ZRE4VP = this.RENTBEMESSUNGSGR_OST_2013;

          }
        }
        this.VSP1 = (this.ZRE4VP.multiply(BigDecimalConst
          .valueOf(0.52)))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);
        this.VSP1 = (this.VSP1.multiply(BigDecimalConst
          .valueOf(0.0945)))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);

      }
      this.VSP2 = (this.ZRE4VP.multiply(BigDecimalConst
        .valueOf(0.12)))
        .setScale(2,
          BigDecimalConst.ROUND_DOWN);

      if (this.STKL == 3) {
        this.VHB = BigDecimalConst.valueOf(3000);

      }
      else {
        this.VHB = BigDecimalConst.valueOf(1900);

      }

      if (this.VSP2.compareTo(this.VHB) == 1) {
        this.VSP2 = this.VHB;

      }
      this.VSPN = (this.VSP1.add(this.VSP2))
        .setScale(0,
          BigDecimalConst.ROUND_UP);

      this.MVSP();

      if (this.VSPN.compareTo(this.VSP) == 1) {
        this.VSP = this.VSPN.setScale(2,
          BigDecimalConst.ROUND_DOWN);

      }
    };

    this.MVSP = function () {

      if (this.ZRE4VP.compareTo(BigDecimalConst.valueOf(47250)) == 1) {
        this.ZRE4VP = BigDecimalConst.valueOf(47250);

      }

      if (this.PKV > 0) {

        if (this.STKL == 6) {
          this.VSP3 = BigDecimalConst.ZERO;

        }
        else {
          this.VSP3 = this.PKPV.multiply(this.ZAHL12)
            .divide(
              this.ZAHL100);

          if (this.PKV == 2) {
            this.KVSATZAG = BigDecimalConst.valueOf(0.07)
              .setScale(5);

            if (this.PVS == 1) {
              this.PVSATZAG = BigDecimalConst.valueOf(
                0.00525)
                .setScale(5);

            }
            else {
              this.PVSATZAG = BigDecimalConst.valueOf(
                0.01025)
                .setScale(5);

            }
            this.VSP3 = this.VSP3.subtract(
              this.ZRE4VP.multiply(this.KVSATZAG
                .add(this.PVSATZAG)))
              .setScale(
                2, BigDecimalConst.ROUND_DOWN);

          }
        }
      }
      else {
        this.KVSATZAN = BigDecimalConst.valueOf(0.079)
          .setScale(5);

        if (this.PVS == 1) {
          this.PVSATZAN = BigDecimalConst.valueOf(0.01525)
            .setScale(5);

        }
        else {
          this.PVSATZAN = BigDecimalConst.valueOf(0.01025)
            .setScale(5);

        }

        if (this.PVZ == 1) {
          this.PVSATZAN = this.PVSATZAN.add(BigDecimalConst
            .valueOf(0.0025));

        }
        this.VSP3 = this.ZRE4VP.multiply(
          this.KVSATZAN.add(this.PVSATZAN))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);

      }
      this.VSP = this.VSP3.add(this.VSP1)
        .setScale(0,
          BigDecimalConst.ROUND_UP);

    };

    this.UMVSP = function () {
      this.VSPVOR = (this.VSPVOR.subtract(this.ZRE4VP
        .multiply(BigDecimalConst.valueOf(0.16))))
        .setScale(2, BigDecimalConst.ROUND_DOWN);

      if (this.VSPVOR.compareTo(BigDecimalConst.ZERO) == -1) {
        this.VSPVOR = BigDecimalConst.ZERO;

      }

      if (this.VSPO.compareTo(this.VSPVOR) == 1) {
        this.VSP = this.VSPVOR;
        this.VSPREST = this.VSPO.subtract(this.VSPVOR);

        if (this.VSPREST.compareTo(this.VSPMAX1) == 1) {
          this.VSP = this.VSP.add(this.VSPMAX1);
          this.VSPREST = (this.VSPREST.subtract(this.VSPMAX1))
            .divide(this.ZAHL2, 2,
              BigDecimalConst.ROUND_UP);

          if (this.VSPREST.compareTo(this.VSPMAX2) == 1) {
            this.VSP = (this.VSP.add(this.VSPMAX2))
              .setScale(0, BigDecimalConst.ROUND_DOWN);

          }
          else {
            this.VSP = (this.VSP.add(this.VSPREST))
              .setScale(0, BigDecimalConst.ROUND_DOWN);

          }
        }
        else {
          this.VSP = (this.VSP.add(this.VSPREST))
            .setScale(0,
              BigDecimalConst.ROUND_DOWN);

        }
      }
      else {
        this.VSP = this.VSPO.setScale(0,
          BigDecimalConst.ROUND_DOWN);

      }
    };

    this.MST5_6 = function () {
      this.ZZX = this.X;

      if (this.ZZX.compareTo(BigDecimalConst.valueOf(26441)) == 1) {
        this.ZX = BigDecimalConst.valueOf(26441);

        this.UP5_6();

        if (this.ZZX.compareTo(BigDecimalConst.valueOf(200584)) == 1) {
          this.ST = (this.ST.add((BigDecimalConst
              .valueOf(200584)
              .subtract(BigDecimalConst
                .valueOf(26441)))
            .multiply(BigDecimalConst
              .valueOf(0.42))))
            .setScale(0,
              BigDecimalConst.ROUND_DOWN);
          this.ST = (this.ST.add((this.ZZX
              .subtract(BigDecimalConst.valueOf(200584)))
            .multiply(BigDecimalConst.valueOf(0.45))))
            .setScale(0, BigDecimalConst.ROUND_DOWN);

        }
        else {
          this.ST = (this.ST.add((this.ZZX
              .subtract(BigDecimalConst.valueOf(26441)))
            .multiply(BigDecimalConst.valueOf(0.42))))
            .setScale(0, BigDecimalConst.ROUND_DOWN);

        }
      }
      else {
        this.ZX = this.ZZX;

        this.UP5_6();

        if (this.ZZX.compareTo(BigDecimalConst.valueOf(9429)) == 1) {
          this.VERGL = this.ST;
          this.ZX = BigDecimalConst.valueOf(9429);

          this.UP5_6();
          this.HOCH = (this.ST.add((this.ZZX
              .subtract(BigDecimalConst.valueOf(9429)))
            .multiply(BigDecimalConst.valueOf(0.42))))
            .setScale(0, BigDecimalConst.ROUND_DOWN);

          if (this.HOCH.compareTo(this.VERGL) == -1) {
            this.ST = this.HOCH;

          }
          else {
            this.ST = this.VERGL;

          }
        }
      }
    };

    this.UP5_6 = function () {
      this.X = (this.ZX.multiply(BigDecimalConst.valueOf(1.25)))
        .setScale(2, BigDecimalConst.ROUND_DOWN);

      this.UPTAB10();
      this.ST1 = this.ST;
      this.X = (this.ZX.multiply(BigDecimalConst.valueOf(0.75)))
        .setScale(2, BigDecimalConst.ROUND_DOWN);

      this.UPTAB10();
      this.ST2 = this.ST;
      this.DIFF = (this.ST1.subtract(this.ST2))
        .multiply(this.ZAHL2);
      this.MIST = (this.ZX
        .multiply(BigDecimalConst.valueOf(0.14)))
        .setScale(
          0, BigDecimalConst.ROUND_DOWN);

      if (this.MIST.compareTo(this.DIFF) == 1) {
        this.ST = this.MIST;

      }
      else {
        this.ST = this.DIFF;

      }
    };

    this.MSOLZ = function () {
      this.SOLZFREI = BigDecimalConst.valueOf(972 * this.KZTAB);

      if (this.JBMG.compareTo(this.SOLZFREI) == 1) {
        this.SOLZJ = (this.JBMG.multiply(BigDecimalConst
          .valueOf(5.5)))
          .divide(this.ZAHL100)
          .setScale(
            2, BigDecimalConst.ROUND_DOWN);
        this.SOLZMIN = (this.JBMG.subtract(this.SOLZFREI))
          .multiply(BigDecimalConst.valueOf(20))
          .divide(
            this.ZAHL100)
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);

        if (this.SOLZMIN.compareTo(this.SOLZJ) == -1) {
          this.SOLZJ = this.SOLZMIN;

        }
        this.JW = this.SOLZJ.multiply(this.ZAHL100)
          .setScale(0,
            BigDecimalConst.ROUND_DOWN);

        this.UPANTEIL();
        this.SOLZLZZ = this.ANTEIL1;

      }
      else {
        this.SOLZLZZ = BigDecimalConst.ZERO;

      }

      if (this.R > 0) {
        this.JW = this.JBMG.multiply(this.ZAHL100);

        this.UPANTEIL();
        this.BK = this.ANTEIL1;

      }
      else {
        this.BK = BigDecimalConst.ZERO;

      }
    };

    this.UPANTEIL = function () {

      if (this.LZZ == 1) {
        this.ANTEIL1 = this.JW;

      }
      else {

        if (this.LZZ == 2) {
          this.ANTEIL1 = this.JW.divide(this.ZAHL12, 0,
            BigDecimalConst.ROUND_DOWN);

        }
        else {

          if (this.LZZ == 3) {
            this.ANTEIL1 = (this.JW.multiply(this.ZAHL7))
              .divide(this.ZAHL360, 0,
                BigDecimalConst.ROUND_DOWN);

          }
          else {
            this.ANTEIL1 = this.JW.divide(this.ZAHL360, 0,
              BigDecimalConst.ROUND_DOWN);

          }
        }
      }
    };

    this.MSONST = function () {
      this.LZZ = 1;

      if (this.ZMVB == 0) {
        this.ZMVB = 12;

      }

      if (this.SONSTB.compareTo(BigDecimalConst.ZERO) == 0) {
        this.VKVSONST = BigDecimalConst.ZERO;
        this.LSTSO = BigDecimalConst.ZERO;
        this.STS = BigDecimalConst.ZERO;
        this.SOLZS = BigDecimalConst.ZERO;
        this.BKS = BigDecimalConst.ZERO;

      }
      else {

        this.MOSONST();

        this.UPVKV();
        this.VKVSONST = this.VKV;
        this.ZRE4J = ((this.JRE4.add(this.SONSTB))
          .divide(this.ZAHL100))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);
        this.ZVBEZJ = ((this.JVBEZ.add(this.VBS))
          .divide(this.ZAHL100))
          .setScale(2,
            BigDecimalConst.ROUND_DOWN);
        this.VBEZBSO = this.STERBE;

        this.MRE4SONST();

        this.MLSTJAHR();

        this.UPVKV();
        this.VKVSONST = this.VKV.subtract(this.VKVSONST);
        this.LSTSO = this.ST.multiply(this.ZAHL100);
        this.STS = this.LSTSO.subtract(this.LSTOSO)
          .multiply(
            BigDecimalConst.valueOf(this.f))
          .divide(
            this.ZAHL100, 0, BigDecimalConst.ROUND_DOWN)
          .multiply(this.ZAHL100);

        if (this.STS.compareTo(BigDecimalConst.ZERO) == -1) {
          this.STS = BigDecimalConst.ZERO;

        }
        this.SOLZS = this.STS.multiply(
          BigDecimalConst.valueOf(5.5))
          .divide(
            this.ZAHL100, 0, BigDecimalConst.ROUND_DOWN);

        if (this.R > 0) {
          this.BKS = this.STS;

        }
        else {
          this.BKS = BigDecimalConst.ZERO;

        }
      }
    };

    this.MVMT = function () {

      if (this.VKAPA.compareTo(BigDecimalConst.ZERO) == -1) {
        this.VKAPA = BigDecimalConst.ZERO;

      }

      if ((this.VMT.add(this.VKAPA))
        .compareTo(BigDecimalConst.ZERO) == 1) {

        if (this.LSTSO.compareTo(BigDecimalConst.ZERO) == 0) {

          this.MOSONST();
          this.LST1 = this.LSTOSO;

        }
        else {
          this.LST1 = this.LSTSO;

        }
        this.VBEZBSO = this.STERBE.add(this.VKAPA);
        this.ZRE4J = ((this.JRE4.add(this.SONSTB)
            .add(this.VMT)
            .add(this.VKAPA))
          .divide(this.ZAHL100))
          .setScale(2, BigDecimalConst.ROUND_DOWN);
        this.ZVBEZJ = ((this.JVBEZ.add(this.VBS)
            .add(this.VKAPA))
          .divide(this.ZAHL100))
          .setScale(2, BigDecimalConst.ROUND_DOWN);
        this.KENNVMT = 2;

        this.MRE4SONST();

        this.MLSTJAHR();
        this.LST3 = this.ST.multiply(this.ZAHL100);

        this.MRE4ABZ();
        this.ZRE4VP = this.ZRE4VP.subtract(
          this.JRE4ENT.divide(this.ZAHL100))
          .subtract(
            this.SONSTENT.divide(this.ZAHL100));
        this.KENNVMT = 1;

        this.MLSTJAHR();
        this.LST2 = this.ST.multiply(this.ZAHL100);
        this.STV = this.LST2.subtract(this.LST1);
        this.LST3 = this.LST3.subtract(this.LST1);

        if (this.LST3.compareTo(this.STV) == -1) {
          this.STV = this.LST3;

        }

        if (this.STV.compareTo(BigDecimalConst.ZERO) == -1) {
          this.STV = BigDecimalConst.ZERO;

        }
        else {
          this.STV = this.STV.multiply(
            BigDecimalConst.valueOf(this.f))
            .divide(this.ZAHL100, 0,
              BigDecimalConst.ROUND_DOWN)
            .multiply(this.ZAHL100);

        }
        this.SOLZV = ((this.STV.multiply(BigDecimalConst
            .valueOf(5.5)))
          .divide(this.ZAHL100))
          .setScale(
            0, BigDecimalConst.ROUND_DOWN);

        if (this.R > 0) {
          this.BKV = this.STV;

        }
        else {
          this.BKV = BigDecimalConst.ZERO;

        }
      }
      else {
        this.STV = BigDecimalConst.ZERO;
        this.SOLZV = BigDecimalConst.ZERO;
        this.BKV = BigDecimalConst.ZERO;

      }
    };

    this.MOSONST = function () {
      this.ZRE4J = (this.JRE4.divide(this.ZAHL100))
        .setScale(2,
          BigDecimalConst.ROUND_DOWN);
      this.ZVBEZJ = (this.JVBEZ.divide(this.ZAHL100))
        .setScale(2,
          BigDecimalConst.ROUND_DOWN);
      this.JLFREIB = this.JFREIB.divide(this.ZAHL100, 2,
        BigDecimalConst.ROUND_DOWN);
      this.JLHINZU = this.JHINZU.divide(this.ZAHL100, 2,
        BigDecimalConst.ROUND_DOWN);

      this.MRE4();

      this.MRE4ABZ();
      this.ZRE4VP = this.ZRE4VP.subtract(this.JRE4ENT
        .divide(this.ZAHL100));

      this.MZTABFB();

      this.MLSTJAHR();
      this.LSTOSO = this.ST.multiply(this.ZAHL100);

    };

    this.MRE4SONST = function () {

      this.MRE4();
      this.FVB = this.FVBSO;

      this.MRE4ABZ();
      this.ZRE4VP = this.ZRE4VP.subtract(
        this.JRE4ENT.divide(this.ZAHL100))
        .subtract(
          this.SONSTENT.divide(this.ZAHL100));
      this.FVBZ = this.FVBZSO;

      this.MZTABFB();

    };

    this.UPTAB10 = function () {

      if (this.X.compareTo(BigDecimalConst.valueOf(8005)) == -1) {
        this.ST = BigDecimalConst.ZERO;

      }
      else {

        if (this.X.compareTo(BigDecimalConst.valueOf(13470)) == -1) {
          this.Y = (this.X.subtract(BigDecimalConst
            .valueOf(8004)))
            .divide(BigDecimalConst
              .valueOf(10000), 6,
              BigDecimalConst.ROUND_DOWN);
          this.RW = this.Y.multiply(BigDecimalConst
            .valueOf(912.17));
          this.RW = this.RW
            .add(BigDecimalConst.valueOf(1400));
          this.ST = (this.RW.multiply(this.Y))
            .setScale(0,
              BigDecimalConst.ROUND_DOWN);

        }
        else {

          if (this.X
            .compareTo(BigDecimalConst.valueOf(52882)) == -1) {
            this.Y = (this.X.subtract(BigDecimalConst
              .valueOf(13469)))
              .divide(
                BigDecimalConst.valueOf(10000), 6,
                BigDecimalConst.ROUND_DOWN);
            this.RW = this.Y.multiply(BigDecimalConst
              .valueOf(228.74));
            this.RW = this.RW.add(BigDecimalConst
              .valueOf(2397));
            this.RW = this.RW.multiply(this.Y);
            this.ST = (this.RW.add(BigDecimalConst
              .valueOf(1038)))
              .setScale(0,
                BigDecimalConst.ROUND_DOWN);

          }
          else {

            if (this.X.compareTo(BigDecimalConst
              .valueOf(250731)) == -1) {
              this.ST = ((this.X.multiply(BigDecimalConst
                  .valueOf(0.42)))
                .subtract(BigDecimalConst
                  .valueOf(8172)))
                .setScale(
                  0, BigDecimalConst.ROUND_DOWN);

            }
            else {
              this.ST = ((this.X.multiply(BigDecimalConst
                  .valueOf(0.45)))
                .subtract(BigDecimalConst
                  .valueOf(15694)))
                .setScale(
                  0, BigDecimalConst.ROUND_DOWN);

            }
          }
        }
      }
      this.ST = this.ST.multiply(BigDecimalConst
        .valueOf(this.KZTAB));

    };
  };

});
