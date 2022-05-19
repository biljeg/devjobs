import {
	getFirestore,
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	startAfter,
} from "../../firebase"
import { useState, useEffect } from "react"
import Job from "../../components/job/Job.component"
import algoliasearch from "algoliasearch/lite"
import "./Jobs.scss"

const client = algoliasearch("CCM9KCDWSJ", "1ab20807be16f802de6c0745cd9a3612")
const index = client.initIndex("jobs")
const db = getFirestore()
const jobsRef = collection(db, "jobs")

const Jobs = () => {
	const [state, setState] = useState({ data: [], loading: true })
	const [lastVisible, setLastVisible] = useState()
	const [fullTime, setFullTime] = useState(false)
	const [searchQ, setSearchQ] = useState("")
	const [locationQ, setLocationQ] = useState("")
	const [shouldReset, setShouldReset] = useState(false)
	const [loadMoreShowing, setLoadMoreShowing] = useState(true)

	const handleCheck = () => {
		setFullTime(!fullTime)
	}

	const handleInput = (e, type) => {
		if (type === "search") {
			setSearchQ(e.target.value)
		} else {
			setLocationQ(e.target.value)
		}
	}

	const reset = () => {
		setShouldReset(!shouldReset)
		setFullTime(false)
		setLocationQ("")
		setSearchQ("")
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!fullTime && locationQ === "" && searchQ === "") return
		const filters = []
		if (fullTime) {
			filters.push("contract:Full Time")
		}
		if (locationQ !== "") {
			filters.push(`location:${locationQ}`)
		}
		const querryRes = await index.search(searchQ, {
			facetFilters: filters,
		})
		if (!querryRes.hits[11]) setLoadMoreShowing(false)
		const data = []
		querryRes.hits.forEach((hit, idx) => {
			if (idx >= 12) return
			data.push(hit)
		})
		setState({ data: data, loading: false })
	}
	const loadMore = async () => {
		const queryRef = query(
			jobsRef,
			orderBy("id", "asc"),
			startAfter(lastVisible),
			limit(4)
		)
		try {
			const snapshot = await getDocs(queryRef)
			if (!snapshot.docs[3]) setLoadMoreShowing(false)
			setLastVisible(snapshot.docs[2])
			const data = []
			snapshot.docs.forEach((doc, idx) => {
				if (idx >= 3) return
				data.push({ ...doc.data() })
			})
			setState(prevState => ({
				data: [...prevState.data, ...data],
				loading: false,
			}))
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		const queryRef = query(jobsRef, orderBy("id", "asc"), limit(12))
		const fetch = async () => {
			try {
				const snapshot = await getDocs(queryRef)
				setLastVisible(snapshot.docs[snapshot.docs.length - 1])
				const data = []
				snapshot.docs.forEach(doc => {
					data.push({ ...doc.data() })
				})
				setState({ data: data, loading: false })
			} catch (err) {
				console.error(err)
			}
		}
		fetch()
	}, [shouldReset])

	return (
		<>
			<main>
				{state.loading ? (
					<div>loading</div>
				) : (
					<div>
						<div>
							<form onSubmit={handleSubmit}>
								<label htmlFor="search">
									<img />
									<input
										id="search"
										type="text"
										value={searchQ}
										onChange={e => handleInput(e, "search")}
									/>
								</label>
								<label htmlFor="location">
									<img />
									<input
										id="location"
										type="text"
										value={locationQ}
										onChange={e => handleInput(e, "location")}
									/>
								</label>
								<div>
									<label htmlFor="check">
										<input
											checked={fullTime ? "checked" : ""}
											onChange={handleCheck}
											id="check"
											type="checkbox"
										/>
										Full Time Only
									</label>
								</div>
								<button type="submit">Search</button>
								<button type="button" onClick={reset}>
									Reset
								</button>
							</form>
						</div>
						<div>
							{state.data.map(job => (
								<Job key={job.id} {...job} />
							))}
						</div>
						<button
							onClick={loadMore}
							style={
								loadMoreShowing ? { display: "inline" } : { display: "none" }
							}
						>
							Load More
						</button>
					</div>
				)}
			</main>
		</>
	)
}
export default Jobs
