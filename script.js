const links = ['https://www.westernmetal.ca/product/standard-small-pistol-primers-fiocchi-1500-per-box-fio-445smp/', 'https://www.westernmetal.ca/product/small-pistol-primers-winchester-1000-per-box-win-wsp/' , 'https://www.westernmetal.ca/product/federal-small-pistol-primers-1000-count-fc-100/', 'https://www.westernmetal.ca/product/small-pistol-primers-cci-1000-per-box-cci-500/', 'https://shooterschoice.com/shop/brand/remington-arms-brand/sremprimersp/', 'https://thegundealer.net/product/winchester-primers-small-pistol-for-standard-pistol-loads-no-wsp-1000-primers/', 'https://thegundealer.net/product/remington-no-5-1-2-small-pistol-primers-1000-primers/', 'https://thegundealer.net/product/winchester-match-grade-primers-small-pistol/', 'https://thegundealer.net/product/cci-small-pistol-primers-no-500-1000-primers/', 'https://thegundealer.net/product/federal-small-pistol-no-100-1000-primers/', 'https://www.rangeviewsports.ca/product/cci-small-pistol-primers-no-500-per-1000/', 'https://www.rangeviewsports.ca/product/federal-small-pistol-primers-100-1000pk/', 'https://www.rangeviewsports.ca/product/federal-small-pistol-primers-100-100ct/', 'https://www.rangeviewsports.ca/product/sellier-bellot-small-pistol-primers-44-boxer-100ct-rangeview-sports-canada-licensed-gun-store-in-newmarket-ontario/', 'https://www.rangeviewsports.ca/product/sellier-bellot-small-pistol-primers-44-boxer-1000ct-rangeview-sports-canada-licensed-gun-store-in-newmarket-ontario/', 'https://www.rangeviewsports.ca/product/campro-unis-ginex-small-pistol-primers-1000ct/', 'https://www.rangeviewsports.ca/product/cci-small-pistol-primers-no-500/', 'https://www.rangeviewsports.ca/product/campro-unis-ginex-small-pistol-primers-100ct/', 'https://alflahertys.com/winchester-small-regular-pistol-pack-of-100-wsp/', 'https://alflahertys.com/cci-primers-small-pistol-no-500-0014/', 'https://sporteque.ca/en/primer/966-win-wsp-small-pistol-primer.html', 'https://sporteque.ca/en/primer/1898-10183-cci-primer-500-small-pistol.html#/502-quantity-1000_units', 'https://sporteque.ca/en/primer/3834-11121-remington-small-pistol-primer.html#/502-quantity-1000_units', 'https://sporteque.ca/en/primer/2435-10340-sellier-bellot-small-pistol-primer.html#/502-quantity-1000_units', 'https://sporteque.ca/en/primer/9508-federal-small-pistol-primer-1820.html'];



//Loop through links and call getHtml()
function start() {
    links.forEach(function (link) {
        setTimeout(function(){
            getHtml(link);
        }, 1000);
    });
}

//Fetch html
function getHtml(link) {
    corsBypass = "https://cors-anywhere.herokuapp.com/" + link;
    html = "";
    
    const xhttp = new XMLHttpRequest();
    
    xhttp.onload = function() {
        checkInStock(this.responseText, link);
    }
    
    xhttp.open("GET", corsBypass);
    xhttp.send();
}

function checkInStock(html, link) {
    if(link.includes('rangeviewsports.ca')) {
        //rangeview sports method
        if (html.includes('<meta property="product:availability" content="instock" />')) {
            inStock(link);
        } else {
            console.log("Item Out Of Stock");
        }
    } else if(link.includes('sporteque.ca')) {
        //Sporteque
        if (html.includes('<i class="material-icons product-available">')) {
            inStock(link);
        } else if(html.includes('<i class="material-icons product-unavailable">')) {
            console.log("Item Out Of Stock");
        } else {
            console.log("Error: " + link);
        }
    } else if(link.includes('alflahertys.com')) {
        //AlFlahertys
        if(html.includes('<div class="form-field form-field--stock">')) {
            inStock(link);
        } else if (html.includes('<span>Temporarily Sold Out</span>')){
            console.log("Item Out Of Stock");
        } else {
            console.log("Error: " + link);
        }
    } else if(html.includes('shooterschoice.com') || html.includes('westernmetal.ca') || html.includes('thegundealer.net')) {
        //Shooters Choice & Western Metal & TheGunDealer
        if (html.includes('class="stock in-stock"')) {
            inStock(link);
        } else if (html.includes('class="stock out-of-stock"')) {
            console.log("Item Out Of Stock");
        } else {
            console.log("Error: " + link);
        }
    } else if(html.includes('alflahertys.com')) {
        //AlFlahertys
        if(html.includes('<div class="form-field form-field--stock">')) {
            inStock(link);
        } else if (html.includes('<span>Temporarily Sold Out</span>')){
            console.log("Item Out Of Stock");
        } else {
            console.log("Error: " + link);
        }
    }
    //cabela's method
//    if (html.includes('http://schema.org/InStock')) {
//        alert("Item In Stock");
//    } else if (html.includes('http://schema.org/SoldOut')) {
//        alert("Item Out Of Stock");
//    }

        //FOC
//    if(html.includes('<div class="stock available" title="Availability">')) {
//        alert("Item In Stock");
//    } else if (html.includes('<div class="stock unavailable" title="Availability">')){
//        alert("Item Out Of Stock");
//    } else {
//        alert("Error");
//    }
    
    //Bullseye North
//    if(html.includes('<p id="avail">Availability <span>in stock')) {
//        alert("Item In Stock");
//    } else if(html.includes('This product is out of stock.')) {
//        alert("Item Out Of Stock");
//    } else {
//        alert("Error");
//    }
}

//Add element for items in stock to document
function inStock(link) {
    console.log("Item In Stock: " + link);
    
    const row = document.createElement('tr');
    const numberColumn = document.createElement('td');
    const linkColumn = document.createElement('td');
    
    numberColumn.innerHTML = links.indexOf(link);
    linkColumn.innerHTML = '<a href="' + link + '">' + link + '</a><br>';
    
    row.appendChild(numberColumn);
    row.appendChild(linkColumn);
    document.getElementById("items").appendChild(row);
    document.getElementById("items").style.visibility = "visible";
}