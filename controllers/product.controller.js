
module.exports.index = async (req, res) => {
    res.json({ data: [{ name: "Dell" }, { name: 'Accer' }] });
}