"use client";

import { useRouter, useSearchParams } from "next/navigation";

import type { Book } from "@/types/book";
import cn from "@/utils/classNames";
import BookItem from "./book";

type Props = {
	read: Book[];
	reading: Book[];
	toRead: Book[];
};

type TabType = "reading" | "next" | "read";

export default function Library({ read, reading, toRead }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const s = searchParams.get("s");

	const tabs: { id: TabType; label: string }[] = [
		{ id: "reading", label: "Reading" },
		{ id: "next", label: "Up next" },
		{ id: "read", label: "Read" },
	];

	function getSelectedBooks() {
		switch (s) {
			case "read":
				return read;
			case "next":
				return toRead;
			default:
				return reading;
		}
	}

	function handleTabChange(tabId: TabType) {
		const params = new URLSearchParams(searchParams);
		if (tabId === "reading") {
			params.delete("s");
		} else {
			params.set("s", tabId);
		}
		router.push(`?${params.toString()}`);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-center space-x-2">
				{tabs.map(tab => (
					<button
						key={tab.id}
						onClick={() => handleTabChange(tab.id)}
						className={cn(
							s === tab.id || (!s && tab.id === "reading")
								? "bg-black shadow-sm ring-1 ring-gray-900"
								: "text-gray-500",
							"flex items-center gap-2 rounded-xl px-4 py-1.5 transition-all duration-200 hover:bg-black hover:text-gray-50 focus:bg-black focus:text-gray-50",
						)}
					>
						{tab.label}
					</button>
				))}
			</div>

			<ul className="space-y-2">
				{getSelectedBooks().map(book => (
					<BookItem key={book.guid} book={book} />
				))}
			</ul>
		</div>
	);
}
