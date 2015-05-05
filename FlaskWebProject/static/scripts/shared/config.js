var dojoConfig = {
  async: true,
  baseUrl: '../',
  locale: 'de-de',

  aliases: [
    ["text", "dojo/text"]
  ],

  packages: [
    {
      name: 'dojo',
      location: 'dojotoolkit/dojo',
      destLocation: 'dojotoolkit/dojo'
    },
    {
      name: 'dijit',
      location: 'dojotoolkit/dijit',
      destLocation: 'dojotoolkit/dijit'
    },

    {name: 'rechner-annuitaetendarlehen'},
    {name: 'rechner-barendwert'},
    {name: 'rechner-breakeven'},
    {name: 'rechner-brutto-netto'},
    {name: 'rechner-est-tarif'},
    {name: 'rechner-est-zve'},
    {name: 'rechner-gew-st-rueck'},
    {name: 'rechner-immo-invest'},
    {name: 'rechner-krisen-signal'},
    {name: 'rechner-projekt-planer'},
    {name: 'rechner-riester-rente'},
    {name: 'rechner-steuerberater-verguetung'},
    {name: 'rechner-zerobond'},
    {name: 'rechner-zinsrechner'},

    {name: 'rechner'},
    {name: 'shared'}
  ]
};
