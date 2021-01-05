const getAllJobs = async (pool) => {
    const client = await pool.connect(console.log("🔌 Connected to the db"))
    const query = "SELECT * FROM main_jobs";
    return await client.query(query)
        .then(resp => resp.rows)
        .catch(err => `There was an error thrown at getAllJobs(): ${err}`)
}

module.exports = { getAllJobs }