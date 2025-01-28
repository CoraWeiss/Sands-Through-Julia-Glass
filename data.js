const objectData = [
    {
        title: "Beauty Revealed",
        artist: "Sarah Goodridge",
        date: "1828",
        type: "Painting",
        collection: "Met Museum",
        description: "A self-portrait made for Daniel Webster (1782-1852)",
        url: "https://www.metmuseum.org/art/collection/search/14521"
    },
    {
        title: "Armchair",
        date: "ca. 1835–40",
        type: "Furniture",
        collection: "Met Museum",
        description: "Mahogany, ash, brass sabots and casters",
        url: "https://www.metmuseum.org/art/collection/search/15597"
    },
    {
        title: "Portrait of a Lady (miniature)",
        date: "ca. 1835",
        type: "Painting",
        collection: "Met Museum",
        description: "Watercolor on ivory, 2 7/16 x 2 in.",
        url: "https://www.metmuseum.org/art/collection/search/15196"
    },
    {
        title: "Portrait of a Lady (miniature)",
        artist: "Daniel F. Ames",
        date: "ca. 1845",
        type: "Painting",
        collection: "Met Museum",
        description: "Watercolor on ivory",
        url: "https://www.metmuseum.org/art/collection/search/18830"
    },
    {
        title: "Rocking Chair",
        artist: "Theodore J. Palmer",
        date: "ca. 1870",
        type: "Furniture",
        collection: "Met Museum",
        description: "Walnut, burl walnut veneer, steel",
        url: "https://www.metmuseum.org/art/collection/search/6875"
    },
    {
        title: "The Contest for the Bouquet",
        artist: "Seymour Joseph Guy",
        date: "1866",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on canvas, The Family of Robert Gordon in Their New York Dining-Room",
        url: "https://www.metmuseum.org/art/collection/search/14472"
    },
    {
        title: "Art Students",
        artist: "Louis Lang",
        date: "ca. 1871",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on canvas",
        url: "https://www.metmuseum.org/art/collection/search/16580"
    },
    {
        title: "Reclining Armchair",
        artist: "George Jakob Hunzinger",
        date: "after 1866",
        type: "Furniture",
        collection: "Met Museum",
        description: "Cherry wood construction",
        url: "https://www.metmuseum.org/art/collection/search/224"
    },
    {
        title: "View of Poestenkill, New York",
        artist: "Joseph H. Hidley",
        date: "ca. 1870",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on wood",
        url: "https://www.metmuseum.org/art/collection/search/11083"
    },
    {
        title: "Cremorne Gardens, No. 2",
        artist: "James McNeill Whistler",
        date: "ca. 1870–80",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on canvas",
        url: "https://www.metmuseum.org/art/collection/search/13223"
    },
    {
        title: "Night",
        artist: "John Singer Sargent",
        date: "1870",
        type: "Drawing",
        collection: "Met Museum",
        description: "Graphite on off-white wove paper, after Michelangelo",
        url: "https://www.metmuseum.org/art/collection/search/12187"
    },
    {
        title: "Bull's Head Tavern",
        artist: "William P. Chappel",
        date: "1870s",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on slate paper",
        url: "https://www.metmuseum.org/art/collection/search/10443"
    },
    {
        title: "The Nurture of Bacchus",
        artist: "John Singer Sargent",
        date: "1874–80",
        type: "Drawing",
        collection: "Met Museum",
        description: "Graphite on off-white wove paper, after Nicolas Poussin",
        url: "https://www.metmuseum.org/art/collection/search/12155"
    },
    {
        title: "A Male Model Standing before a Stove",
        artist: "John Singer Sargent",
        date: "ca. 1875–80",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on canvas",
        url: "https://www.metmuseum.org/art/collection/search/12128"
    },
    {
        title: "Folding Armchair",
        artist: "Marks Adjustable Folding Chair Company",
        date: "ca. 1877–97",
        type: "Furniture",
        collection: "Met Museum",
        description: "Walnut and metal construction",
        url: "https://www.metmuseum.org/art/collection/search/229"
    },
    {
        title: "Lydia Crocheting in the Garden at Marly",
        artist: "Mary Cassatt",
        date: "1880",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on canvas",
        url: "https://www.metmuseum.org/art/collection/search/10393"
    },
    {
        title: "The Pathetic Song",
        artist: "Thomas Eakins",
        date: "1881",
        type: "Painting",
        collection: "Met Museum",
        description: "Watercolor on off-white wove paper",
        url: "https://www.metmuseum.org/art/collection/search/10822"
    },
    {
        title: "Quilt Top, Crazy pattern",
        date: "ca. 1885",
        type: "Textile",
        collection: "Met Museum",
        description: "Silk, satin, velvet, and cotton",
        url: "https://www.metmuseum.org/art/collection/search/13647"
    },
    {
        title: "The Artist's Wife and His Setter Dog",
        artist: "Thomas Eakins",
        date: "ca. 1884–89",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on canvas",
        url: "https://www.metmuseum.org/art/collection/search/10811"
    },
    {
        title: "Arrangement in Flesh Colour and Black",
        artist: "James McNeill Whistler",
        date: "1883",
        type: "Painting",
        collection: "Met Museum",
        description: "Portrait of Theodore Duret",
        url: "https://www.metmuseum.org/art/collection/search/13211"
    },
    {
        title: "Lady at the Tea Table",
        artist: "Mary Cassatt",
        date: "1883–85",
        type: "Painting",
        collection: "Met Museum",
        description: "Oil on canvas",
        url: "https://www.metmuseum.org/art/collection/search/10391"
    },
    {
        title: "Chandelier",
        artist: "George A. Schastey & Co.",
        date: "1881–82",
        type: "Furniture",
        collection: "Met Museum",
        description: "Brass, mother-of-pearl, glass shades, and semi-precious stones",
        url: "https://www.metmuseum.org/art/collection/search/19781"
    },
    {
        title: "Dressing glass",
        artist: "George A. Schastey & Co.",
        date: "1881–82",
        type: "Furniture",
        collection: "Met Museum",
        description: "Satinwood, purpleheart, mother-of-pearl, brass, and mirror glass",
        url: "https://www.metmuseum.org/art/collection/search/19777"
    },
    {
        title: "Woman on a Bench",
        artist: "Mary Cassatt",
        date: "ca. 1881",
        type: "Painting",
        collection: "Met Museum",
        description: "Pastel on green wove paper",
        url: "https://www.metmuseum.org/art/collection/search/10424"
    },
    {
        title: "Chester Alan Arthur Papers",
        artist: "Unknown",
        date: "1881-1885",
        type: "Presidential Archive",
        collection: "Library of Congress",
        description: "Presidential correspondence and manuscripts",
        url: "https://www.loc.gov/collections/chester-alan-arthur-papers/about-this-collection/"
    },
    {
        title: "Julia Sand's Letters",
        artist: "Julia Sand",
        date: "1881-1883",
        type: "Letters",
        collection: "Library of Congress",
        description: "Correspondence with President Arthur",
        url: "https://www.loc.gov/collections/chester-alan-arthur-papers/articles-and-essays/correspondence-of-julia-i-sand/"
    },
    {
        title: "Shall women vote",
        artist: "Frank Boylen",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "",
        url: "https://www.loc.gov/item/2023840262/"
    },
    {
        title: "Right forward march",
        artist: "John Philip Sousa",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "Op. 128",
        url: "https://www.loc.gov/item/2018563899/"
    },
    {
        title: "Now is the time for the baby to sleep",
        artist: "F. Whittaker",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "",
        url: "https://www.loc.gov/item/2023795800/"
    },
    {
        title: "Bringing pretty blossoms",
        artist: "Thomas P. Westendorf",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "To strew on mother's grave",
        url: "https://www.loc.gov/collections/songs-of-america/?dates=1800/1899&q=1881&sb=date&sp=10"
    },
    {
        title: "The stars at bedtime",
        artist: "Felix Cadieux",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "",
        url: "https://www.loc.gov/item/2023791400/"
    },
    {
        title: "The forlorn old maid",
        artist: "David Braham & Edward Harrigan",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "",
        url: "https://www.loc.gov/item/2023791553/"
    },
    {
        title: "President Garfield died last night",
        artist: "A. H. Rosewig & R. Griswold",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "Memorial song",
        url: "https://www.loc.gov/item/2023794283/"
    },
    {
        title: "Alone",
        artist: "H. S. Perkins",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "",
        url: "https://www.loc.gov/item/2023794465/"
    },
    {
        title: "Bachelor button galop",
        artist: "Geo. W. Major",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "",
        url: "https://www.loc.gov/item/2023789600/"
    },
    {
        title: "The roller skates galop",
        artist: "Henry Maylath",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "",
        url: "https://www.loc.gov/item/2023789665/"
    },
    {
        title: "Garfield's memorial march",
        artist: "Karl Merz",
        date: "1881",
        type: "Sheet Music",
        collection: "Library of Congress",
        description: "",
        url: "https://www.loc.gov/item/2023789729/"
    }
];

// Make the data available globally
window.objectData = objectData;
