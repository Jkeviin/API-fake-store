let firstLoad = true;
let nombreActual = "all";

//selecting all required elements
const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = () => {
    //after window loaded
    filterItem.onclick = (selectedItem) => {
        //if user click on filterItem div
        if (selectedItem.target.classList.contains("item")) {
            //if user selected item has .item class
            filterItem.querySelector(".active").classList.remove("active"); //remove the active class which is in first item
            selectedItem.target.classList.add("active"); //add that active class on user selected item
            let filterName = selectedItem.target.getAttribute("data-name"); //getting data-name value of user selected item and store in a filtername variable
            if(nombreActual != filterName){
                nombreActual = filterName;
                if (filterName === "all") {
                    consultatodo();
                } else {
                    ProductoCategoria(filterName);
                }
            }
        }
    };
    for (let i = 0; i < filterImg.length; i++) {
        filterImg[i].setAttribute("onclick", "preview(this)"); //adding onclick attribute in all available images
    }
    consultatodo();

};
const consultatodo = () => {
    document.getElementById("cargando").style.display = "block";
    fetch("https://fakestoreapi.com/products", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                console.clear();
                throw new Error("Error 404: No se encontró el recurso");
            } else if (response.status === 500) {
                console.clear();
                throw new Error("Error del servidor");
            } else {
                console.clear();
                throw new Error("Error desconocido");
            }
        })
        .then((json) => {
            if(firstLoad){
                iniciar(json);
            }
            getData(json);
        })
        .catch((error) => console.log("ERROR ---->", error))
        .finally(() => {
            document.getElementById("cargando").style.display = "none";
        });
};

const getData = (data) => {
    let html = "";
    data.forEach((c) => {
        html += `    <div class = "product" value="${c.id}">`;
        html += `                     <div class = "product-content">`;
        html += `                        <div class = "product-img" onclick="comprobar(${c.id})">`;
        html += `                            <img src = "${c.image}" alt = "product image">`;
        html += `                        </div>`;
        html += `                        <div class = "product-btns">`;
        html += `                            <button type = "button" onclick="agregar(${c.id}, `+ ((parseFloat(c.price) - (15 * parseFloat(c.price)) / 100).toFixed(2)) +`)" class = "btn-cart"> add to cart`;
        html += `                                <span><i class = "fas fa-plus"></i></span>`;
        html += `                            </button>`;
        html += `                            <button type = "button" onclick="buy_individual(${c.id})" class = "btn-buy"> buy now`;
        html += `                                <span><i class = "fas fa-shopping-cart"></i></span>`;
        html += `                            </button>`;
        html += `                        </div>`;
        html += `                    </div>`;
        html += `                    <div class = "product-info">`;
        html += `                        <div class = "product-info-top">`;
        html += `                            <h2 class = "sm-title">${c.category}</h2>`;
        html += `                            <div class = "rating.rate">`;
        if (Math.round(c.rating.rate) === 5) {
            for (let i = 0; i < 5; i++) {
                html += `                                <i class = "fas fa-star"></i>`;
            }
        } else if (Math.round(c.rating.rate) === 4) {
            for (let i = 0; i < 4; i++) {
                html += `                                <i class = "fas fa-star"></i>`;
            }
            html += `                                <span><i class = "far fa-star"></i></span>`;
        } else if (Math.round(c.rating.rate) === 3) {
            for (let i = 0; i < 3; i++) {
                html += `                                <i class = "fas fa-star"></i>`;
            }
            for (let i = 0; i < 2; i++) {
                html += `                                <span><i class = "far fa-star"></i></span>`;
            }
        } else if (Math.round(c.rating.rate) === 2) {
            for (let i = 0; i < 2; i++) {
                html += `                                <i class = "fas fa-star"></i>`;
            }
            for (let i = 0; i < 3; i++) {
                html += `                                <span><i class = "far fa-star"></i></span>`;
            }
        } else if (Math.round(c.rating.rate) === 1) {
            for (let i = 0; i < 1; i++) {
                html += `                                <i class = "fas fa-star"></i>`;
            }
            for (let i = 0; i < 4; i++) {
                html += `                                <span><i class = "far fa-star"></i></span>`;
            }
        }
        html += `                            </div>`;
        html += `                        </div>`;
        html += `                        <a class = "product-name">${c.title}</a>`;
        html += `                        <p class = "product-price">$ ${c.price}</p>`;
        html +=
            `                        <p class = "product-price">$ ` +
            (parseFloat(c.price) - (15 * parseFloat(c.price)) / 100).toFixed(2) +
            ` </p>`;
        html += `                    </div>`;
        html += `                    <div class = "off-info">`;
        html += `                        <h2 class = "sm-title">15% off</h2>`;
        html += `                    </div>`;
        html += `                </div>`;
        html += `           </div>`;
        //////////////////////////////////
    });
    document.getElementById("product-item").innerHTML = html;
}

const iniciar = (data) => {
    if(localStorage.getItem("carrito") != null){
        cart_carrito();
    }
    let unicos = [];
    let html2 = "";
    data.forEach((c) => {
        if(firstLoad){
            if (!unicos.includes(c.category)) {
                unicos.push(c.category);
                html2 = `<span class="item" data-name="${c.category}" id="${c.id}">${c.category}</span>`;
                document.getElementById("items").innerHTML += html2;
            }
        }
    });
    firstLoad = false;
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const agregar = (id, precio) => {
    let count = 1;
    if (localStorage.getItem("carrito") === null) {
        let carrito = [];
        carrito.push({
            id: id,
            precio: precio,
            count: count,
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        carrito.forEach((c) => {
            if (c.id === id) {
                c.count++;
                count++;
            }
        });
        if (count === 1 ){
            carrito.push({
                id: id,
                precio: precio,
                count: count,
            });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    cart_carrito();
};

const cart_carrito = () => {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    let contador = 0;
    let total = 0;
    carrito.forEach((c) => {
        total += c.precio * c.count;
        contador += c.count;
    });
    document.getElementById("total-Products").innerHTML = contador;
    document.getElementById("total-price").innerHTML = "$ " + total.toFixed(1);
}

const buy_carrito = () => {
    if(localStorage.getItem("carrito") != null){
        const fecha = new Date();
        let  compra = "";
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        carrito.forEach((c,i) => {
            compra += `{productId:${c.id}, quantity:${c.count}}`
            if((carrito.length-1) != i){
                compra += ",";
            }
        })
        document.getElementById("total-Products").innerHTML = 0;
        document.getElementById("total-price").innerHTML = "$ 0";

        document.getElementById("cargando").style.display = "block";
        fetch(`https://fakestoreapi.com/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(
                {
                    userId: 1,
                    date: fecha.toLocaleDateString(),
                    products:[compra]
                }
            )
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                console.clear();
                throw new Error("Error 404: No se encontró el recurso");
            } else if (response.status === 500) {
                console.clear();
                throw new Error("Error del servidor");
            } else {
                console.clear();
                throw new Error("Error desconocido");
            }
        })
        .then((json) => {
            console.log(json);
            localStorage.removeItem("carrito");
        })
        .catch((error) => console.log("ERROR ---->", error))
        .finally(() => {
            document.getElementById("cargando").style.display = "none";
            alert("Compra realizada con éxito");
        });
    }else{
        alert("No hay productos en el carrito");
    }
}


////////////////////////////////////////
const ProductoCategoria = (categoria) => {
    document.getElementById("cargando").style.display = "block";
    fetch(`https://fakestoreapi.com/products/category/${categoria}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 404) {
            console.clear();
            throw new Error("Error 404: No se encontró el recurso");
        } else if (response.status === 500) {
            console.clear();
            throw new Error("Error del servidor");
        } else {
            console.clear();
            throw new Error("Error desconocido");
        }
    })
    .then((json) => {
        getData(json);
    })
    .catch((error) => console.log("ERROR ---->", error))
    .finally(() => {
        document.getElementById("cargando").style.display = "none";
    });
};

////////////////////////////////////////

function comprobar(id) {
    document.getElementById("cargando").style.display = "block";
    fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                console.clear();
                throw new Error("Error 404: No se encontró el recurso");
            } else if (response.status === 500) {
                console.clear();
                throw new Error("Error del servidor");
            } else {
                console.clear();
                throw new Error("Error desconocido");
            }
        })
        .then((json) => {
            Details(json);
        })
        .catch((error) => console.log("ERROR ---->", error))
        .finally(() => {
            document.getElementById("cargando").style.display = "none";
        });
}

const Details = (data) => {
    document.getElementById("modal_container").style.display = "block";
    let html = "";
    html += `<div class = "card-wrapper2">`;
    html += `<div class = "card2">`;
    html += `  <div class = "product-imgs2">`;
    html += `    <div class = "img-display2">`;
    html += `      <div class = "img-showcase2">`;
    html += `        <img src = "${data.image}" alt = "image">`;
    html += `        <img src = "./Assets/img/Sello.webp" alt = "image">`;
    html += `        <img src = "../Assets/img/image.png" alt = "image">`;
    html += `      </div>`;
    html += `    </div>`;
    html += `    <div class = "img-select2">`;
    html += `      <div class = "img-item">`;
    html += `        <a href = "#" data-id = "1">`;
    html += `          <img src = "${data.image}" alt = "shoe image">`;
    html += `        </a>`;
    html += `      </div>`;
    html += `      <div class = "img-item">`;
    html += `       <a href = "#" data-id = "2">`;
    html += `          <img src = "./Assets/img/Sello.webp" alt = "shoe image">`;
    html += `        </a>`;
    html += `      </div>`;
    html += `      <div class = "img-item">`;
    html += `        <a href = "#" data-id = "3">`;
    html += `          <img src = "../Assets/img/image.png" alt = "shoe image">`;
    html += `        </a>`;
    html += `      </div>`;
    html += `    </div>`;
    html += `  </div>`;
    html += `  <div class = "product-content2">`;
    html += `        <div class="contenedor-x"><span id="close" class="close">&times;</span></div>`;
    html += `    <h2 class = "product-title2">${data.title}</h2>`;
    html += `    <a class = "product-link2">${data.category}</a>`;
    html += `    <div class = "product-rating2">`;
    if (Math.round(data.rating.rate) === 5) {
        for (let i = 0; i < 5; i++) {
            html += `                                <i class = "fas fa-star"></i>`;
        }
    } else if (Math.round(data.rating.rate) === 4) {
        for (let i = 0; i < 4; i++) {
            html += `                                <i class = "fas fa-star"></i>`;
        }
        html += `                                <span><i class = "far fa-star"></i></span>`;
    } else if (Math.round(data.rating.rate) === 3) {
        for (let i = 0; i < 3; i++) {
            html += `                                <i class = "fas fa-star"></i>`;
        }
        for (let i = 0; i < 2; i++) {
            html += `                                <span><i class = "far fa-star"></i></span>`;
        }
    } else if (Math.round(data.rating.rate) === 2) {
        for (let i = 0; i < 2; i++) {
            html += `                                <i class = "fas fa-star"></i>`;
        }
        for (let i = 0; i < 3; i++) {
            html += `                                <span><i class = "far fa-star"></i></span>`;
        }
    } else if (Math.round(data.rating.rate) === 1) {
        for (let i = 0; i < 1; i++) {
            html += `                                <i class = "fas fa-star"></i>`;
        }
        for (let i = 0; i < 4; i++) {
            html += `                                <span><i class = "far fa-star"></i></span>`;
        }
    }
    html += `      <span>${data.rating.rate}(${data.rating.count})</span>`;
    html += `    </div>`;
    html += `    <div class = "product-price2">`;
    html += `      <p class = "last-price2">Old Price: <span>$${data.price}</span></p>`;
    html +=
        `      <p class = "new-price2">New Price: <span>$` +
        (parseFloat(data.price) - (15 * parseFloat(data.price)) / 100).toFixed(2) +
        `</span></p>`;
    html += `    </div>`;
    html += `    <div class = "product-detail2">`;
    html += `      <h2>about this item: </h2>`;
    html += `      <p>${data.description}</p>`;
    html += `      <ul>`;
    html += `        <li>Available: <span>in stock</span></li>`;
    html += `        <li>Category: <span>${data.category}</span></li>`;
    html += `        <li>Shipping Fee: <span>Free</span></li>`;
    html += `      </ul>`;
    html += `    </div>`;

    html += `    <div class = "purchase-info2">`;
    html += `      <input type = "number" id="input_cantidad" min = "0" value = "1">`;
    html += `      <button type = "button" onclick="agregar_cantidad(${data.id}, `+ ((parseFloat(data.price) - (15 * parseFloat(data.price)) / 100).toFixed(2)) +`)"  class = "btn">`;
    html += `        Add to Cart <i class = "fas fa-shopping-cart"></i>`;
    html += `      </button>`;
    html += `    </div>`;
    html += `    <div class = "social-links2">`;
    html += `      <p>Share At: </p>`;
    html += `      <a href="https://www.facebook.com/profile.php?id=100036200142907" target="_blank">`;
    html += `        <i class = "fab fa-facebook-f"></i>`;
    html += `      </a>`;
    html += `      <a href="https://www.instagram.com/jkeviin_/" target="_blank">`;
    html += `        <i class = "fab fa-instagram"></i>`;
    html += `      </a>`;
    html += `      <a href="whatsapp://send?text=Buen día, vengo de la pagina web y estoy interesado en el producto: ${data.title}&phone=573178980783>" data-action="share/whatsapp/share">`;
    html += `        <i class = "fab fa-whatsapp"></i>`;

    html += `      </a>`;
    html += `    </div>`;
    html += `  </div>`;
    html += `</div>`;
    html += `</div>`;

    document.getElementById("modal_container").innerHTML = html;

    const imgs = document.querySelectorAll(".img-select2 a");
    const imgBtns = [...imgs];
    let imgId = 1;

    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener("click", (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });

    function slideImage() {
        const displayWidth = document.querySelector(
            ".img-showcase2 img:first-child"
        ).clientWidth;

        document.querySelector(".img-showcase2").style.transform = `translateX(${-(imgId - 1) * displayWidth
            }px)`;
    }

    window.addEventListener("resize", slideImage);

    document.getElementById("close").addEventListener("click", function () {
        document.getElementById("modal_container").style.display = "none";
    });
};

const agregar_cantidad = (id, precio) => {

    let count = 1;
    if (localStorage.getItem("carrito") === null) {
        let carrito = [];
        carrito.push({
            id: id,
            precio: precio,
            count: parseInt(document.getElementById("input_cantidad").value),
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else {
        let carrito = JSON.parse(localStorage.getItem("carrito"));
        carrito.forEach((c) => {
            if (c.id === id) {
                c.count += parseInt(document.getElementById("input_cantidad").value);
                count += parseInt(document.getElementById("input_cantidad").value);
            }
        });
        if (count === 1){
            carrito.push({
                id: id,
                precio: precio,
                count: count,
            });
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    cart_carrito();
};

const buy_individual = (id) => {

    const fecha = new Date();
    document.getElementById("cargando").style.display = "block";
    fetch(`https://fakestoreapi.com/carts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(
            {
                userId: 1,
                date: fecha.toLocaleDateString(),
                products:[{productId:id,quantity:1}]
            }
        )
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else if (response.status === 404) {
            console.clear();
            throw new Error("Error 404: No se encontró el recurso");
        } else if (response.status === 500) {
            console.clear();
            throw new Error("Error del servidor");
        } else {
            console.clear();
            throw new Error("Error desconocido");
        }
    })
    .then((json) => {
        console.log(json);
        localStorage.removeItem("carrito");
    })
    .catch((error) => console.log("ERROR ---->", error))
    .finally(() => {
        document.getElementById("cargando").style.display = "none";
        alert("Compra realizada con éxito");
    });
}



