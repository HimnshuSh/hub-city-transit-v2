import Search from "../components/search";

export default function DisplaySearch({ searchLayers }) {
    return <div id="search-box" className="search-container">
        <Search searchLayers={searchLayers} />
    </div>
}