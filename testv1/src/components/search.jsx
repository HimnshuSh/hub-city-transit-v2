import { useEffect, useRef } from 'react'
import L from 'leaflet'
import { useMap } from 'react-leaflet'

import 'leaflet-search'
import './searchBox.css'

export default function Search({ searchLayers }) {
    const map = useMap()
    const searchControlRef = useRef(null)
    useEffect(() => {
        const layerToSearch = searchLayers.current

        if (!layerToSearch || layerToSearch.getLayers().length === 0) {
            console.log("Search layers not ready or empty.")
            return
        }

        const searchControl = new L.control.search({
            container: 'search-box',
            layer: layerToSearch,
            propertyName: 'searchName',
            tooltipLimit: 10,
            marker: false,
            initial: false,
            collapsed: false,
            moveToLocation: function (latlng, title, map) {
                map.flyTo(latlng, 17)
            },
        }).on('search:locationfound', function (e) {
            setTimeout(() => e.layer.openPopup(), 500)
        })

        // 1. Get a reference to the search control instance (assuming it's 'searchControl')
        //    And the original keypress handler
        const originalHandleKeypress = searchControl._handleKeypress

        // 2. Override the method on your instance
        searchControl._handleKeypress = function (e) {

            // Call the original function first
            originalHandleKeypress.call(this, e)

            // If it was Backspace, Insert, or Delete, force the search to run now.
            // The original code only ran this: this._autoTypeTmp = false

            // We check the key codes that were previously blocked from triggering a search.
            if (e.keyCode === 8 || e.keyCode === 45 || e.keyCode === 46) {

                // This is the core logic from the 'default' block that was skipped:
                if (this._input.value.length >= this.options.minLength) {

                    clearTimeout(this.timerKeypress)

                    // Directly call the search function now (no delay needed, as it was a manual deletion)
                    this._fillRecordsCache()

                } else {
                    this._hideTooltip()
                }

                // Also ensure the cancel button is handled correctly on backspace to empty
                if (this._input.value.length) {
                    this._cancel.style.display = 'block'
                } else {
                    this._cancel.style.display = 'none'
                }
            }

            // The original also has this at the end: this._handleAutoresize() 
            // which is covered by the call to originalHandleKeypress, but doesn't hurt to re-check
            this._handleAutoresize()
        }

        // You need to call this override *after* the search control has been initialized.
        searchControlRef.current = searchControl

        map.addControl(searchControl)

        return () => {
            map.removeControl(searchControl)
        }

    }, [map, searchLayers])

    return null
}