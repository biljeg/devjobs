import {
	getFirestore,
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	startAfter,
	getAuth,
	signOut,
} from "../../firebase"
import { useState, useEffect } from "react"
import algoliasearch from "algoliasearch/lite"
import Job from "../../components/job/Job.component"
import Filter from "../../components/filter/Filter.component"
import { Button1, Button2 } from "../../components/utils/Utils.component"
import "./Jobs.scss"

const client = algoliasearch("CCM9KCDWSJ", "1ab20807be16f802de6c0745cd9a3612")
const index = client.initIndex("jobs")
const db = getFirestore()
const jobsRef = collection(db, "jobs")
const auth = getAuth()

const Jobs = () => {
	const [state, setState] = useState({ data: [], loading: true })
	const [lastVisible, setLastVisible] = useState()
	const [shouldReset, setShouldReset] = useState(false)
	const [loadMoreShowing, setLoadMoreShowing] = useState(true)
	const [desktopFilter, setDesktopFilter] = useState(
		window.matchMedia("(min-width: 600px)").matches
	)

	const onSubmit = async formData => {
		let location
		let fullTime
		if (desktopFilter) {
			if (
				!formData.fullTimeDesktop &&
				formData.locationDesktop === "" &&
				formData.search === ""
			) {
				return
			} else {
				location = formData.locationDesktop
				fullTime = formData.fullTimeDesktop
			}
		} else {
			if (
				!formData.fullTimeMobile &&
				formData.locationMobile === "" &&
				formData.search === ""
			) {
				return
			} else {
				location = formData.locationMobile
				fullTime = formData.fullTimeMobile
			}
		}
		const filters = []
		if (fullTime) {
			filters.push("contract:Full Time")
		}
		if (location !== "") {
			filters.push(`location:${location}`)
		}
		const queryRes = await index.search(formData.search, {
			facetFilters: filters,
		})
		if (!queryRes.hits[11]) setLoadMoreShowing(false)
		const data = []
		queryRes.hits.forEach((hit, idx) => {
			if (idx >= 12) return
			data.push(hit)
		})
		setState({ data: data, loading: false })
	}

	const resetForm = reset => {
		setShouldReset(!shouldReset)
		reset("fullTime")
		reset("search")
		reset("location")
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

	const signOutBtn = async () => {
		await signOut(auth)
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
	useEffect(() => {
		window
			.matchMedia("(min-width: 600px)")
			.addEventListener("change", e => setDesktopFilter(e.matches))
	}, [])

	return (
		<>
			<main>
				{state.loading ? (
					<div>loading</div>
				) : (
					<section className="jobs-section">
						<Filter resetForm={resetForm} onSubmit={onSubmit} />
						<div className="jobs-grid">
							{state.data.map(job => (
								<Job key={job.id} {...job} />
							))}
						</div>
						<Button1
							onClick={loadMore}
							style={
								loadMoreShowing ? { display: "inline" } : { display: "none" }
							}
						>
							Load More
						</Button1>
						<Button2 onClick={signOutBtn}>Sign out</Button2>
					</section>
				)}
			</main>
		</>
	)
}
export default Jobs
