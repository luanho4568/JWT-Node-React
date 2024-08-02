const handleHelloWorld = (req, res) => {
    const name = "Luan"
    return res.render("home.ejs", {name});
};

export { handleHelloWorld };
