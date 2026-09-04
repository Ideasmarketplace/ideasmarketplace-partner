"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Layers,
  Users,
  FileCheck2,
  FileEdit,
  Loader2,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Api from "@/utils/api";
import { useUserStore } from "@/utils/user-store";
import AssetIllustration from "@/components/AssetIllustration";
import NetworkAssetCard from "@/components/network-assets/NetworkAssetCard";
import { Skeleton } from "@/components/ui/skeleton";

/* =========================================================
Types
========================================================= */

interface NetworkAssetOwner {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  photo?: string;
}

interface NetworkAsset {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  category?: string;
  price?: number;
  status: "draft" | "published";
  assetType: "audio" | "visual";
  thumbnail?: string;

  purchaseCount?: number;
  downloadCount?: number;
  revenue?: number;

  owner?: NetworkAssetOwner | null;

  createdAt: string;
  updatedAt: string;
}

interface NetworkAssetMetrics {
  totalAssets: number;
  publishedAssets: number;
  draftAssets: number;
  referredUsers: number;
}

interface NetworkAssetPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface NetworkAssetsResponse {
  assets: NetworkAsset[];
  pagination: NetworkAssetPagination;
  metrics?: NetworkAssetMetrics;
}

/* =========================================================
Constants
========================================================= */

const PAGE_SIZE = 20;

/* =========================================================
Loading Skeleton
========================================================= */

function NetworkAssetsSkeleton() {
  return (
    <main className="flex-1">
      {" "}
      <div className="space-y-6 animate-pulse">
        <section className="relative overflow-hidden rounded-3xl bg-gray-100 px-6 py-8 sm:px-10 sm:py-10">
          {" "}
          <div className="flex flex-col items-center justify-between gap-10 xl:flex-row">
            {" "}
            <div className="w-full max-w-2xl">
              {" "}
              <Skeleton className="h-8 w-48 rounded-full" />{" "}
              <Skeleton className="mt-5 h-14 w-3/4 rounded-xl" />
              <div className="mt-5 space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
              </div>
            </div>
            <Skeleton className="h-64 w-64 rounded-3xl" />
          </div>
        </section>

        {/* Metrics */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-3 h-9 w-20" />
                </div>

                <Skeleton className="h-14 w-14 rounded-2xl" />
              </div>

              <Skeleton className="mt-6 h-4 w-36" />
            </div>
          ))}
        </section>

        {/* Toolbar */}
        <section className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <Skeleton className="h-11 flex-1 rounded-xl" />
            <Skeleton className="h-11 w-full md:w-40 rounded-xl" />
            <Skeleton className="h-11 w-full md:w-40 rounded-xl" />
          </div>
        </section>

        {/* Table */}
        <section className="rounded-2xl border bg-white shadow-sm">
          <div className="p-6">
            <Skeleton className="h-6 w-40" />
          </div>

          <div className="space-y-4 p-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
Empty State
========================================================= */

function EmptyState() {
  return (
    <div className="px-6 py-16 text-center">
      {" "}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
        {" "}
        <Layers className="h-8 w-8 text-gray-400" />{" "}
      </div>
      <h3 className="mt-5 text-lg font-semibold text-gray-900">
        No network assets found
      </h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
        Assets created by users in your referral network will appear here.
      </p>
    </div>
  );
}

/* =========================================================
Page
========================================================= */

export default function NetworkAssetsPage() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  const token = useUserStore((state) => state.token);

  const [data, setData] = useState<NetworkAssetsResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  /* =========================================================
Fetch Network Assets
========================================================= */

  useEffect(() => {
    const fetchNetworkAssets = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", String(PAGE_SIZE));

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (status) {
          params.set("status", status);
        }

        if (category) {
          params.set("category", category);
        }

        const response = await Api.get(
          `partner/assets/network?${params.toString()}`,
        );

        console.log({response})

        if (response.status === 200) {
          setData({
            assets: response.data.assets || [],
            pagination: response.data.pagination || {
              page,
              limit: PAGE_SIZE,
              total: 0,
              pages: 0,
            },
            metrics: response.data.metrics,
          });
        }
      } catch (err: any) {
        console.error("Failed to fetch network assets:", err);

        setError(
          err?.response?.data?.message || "Unable to load network assets.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNetworkAssets();
  }, [page, search, status, category]);

  /* =========================================================
Search
========================================================= */

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchInput]);

  /* =========================================================
Reset pagination when filters change
========================================================= */

  useEffect(() => {
    setPage(1);
  }, [status, category]);

  /* =========================================================
Animation
========================================================= */

  useGSAP(
    () => {
      if (loading || !data) return;

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
      )
        .fromTo(
          badgeRef.current,
          {
            opacity: 0,
            y: -10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
          },
          "-=0.4",
        )
        .fromTo(
          titleRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.2",
        )
        .fromTo(
          paragraphRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.3",
        );
    },
    {
      scope: sectionRef,
      dependencies: [loading, data],
    },
  );

  /* =========================================================
Loading
========================================================= */

  if (loading && !data) {
    return <NetworkAssetsSkeleton />;
  }

  /* =========================================================
Error
========================================================= */

  if (error && !data) {
    return (
      <main className="flex-1">
        {" "}
        <div className="flex min-h-[500px] items-center justify-center">
          {" "}
          <div className="text-center">
            {" "}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              {" "}
              <Layers className="h-7 w-7 text-red-500" />{" "}
            </div>
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Unable to load network assets
            </h2>
            <p className="mt-2 text-sm text-gray-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  const metrics = data?.metrics;

  const totalAssets = metrics?.totalAssets ?? 0;
  const publishedAssets = metrics?.publishedAssets ?? 0;
  const draftAssets = metrics?.draftAssets ?? 0;
  const referredUsers = metrics?.referredUsers ?? 0;

  const assets = data?.assets ?? [];

  const pagination = data?.pagination;

  /* =========================================================
Helpers
========================================================= */

  const formatCurrency = (value: number = 0) => {
    return `₦${value.toLocaleString("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  };

  const getAssetThumbnail = (asset: NetworkAsset) => {
    return asset.thumbnail || "";
  };

  /* =========================================================
Render
========================================================= */

  return (
    <main className="flex-1">
      {" "}
      <div ref={sectionRef} className="space-y-6">
        {/* =====================================================
Hero
===================================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-100 via-blue-50 to-indigo-100 px-6 py-8 shadow-sm sm:px-10 sm:py-10">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />

          <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-10 xl:flex-row">
            <div className="max-w-2xl">
              <span
                ref={badgeRef}
                className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow"
              >
                Network Asset Overview
              </span>

              <h1
                ref={titleRef}
                className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
              >
                Network Assets
              </h1>

              <p
                ref={paragraphRef}
                className="mt-5 text-base leading-8 text-slate-600 sm:text-lg"
              >
                View and monitor digital assets created by users within your
                referral network.
              </p>
            </div>

            <AssetIllustration />
          </div>
        </section>

        {/* =====================================================
        Metrics
    ===================================================== */}

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <NetworkAssetCard
            type="totalAssets"
            data={{
              value: totalAssets,
              changeLabel: "Across your network",
            }}
          />

          <NetworkAssetCard
            type="publishedAssets"
            data={{
              value: publishedAssets,
              changeLabel: "Currently published",
            }}
          />

          <NetworkAssetCard
            type="drafts"
            data={{
              value: draftAssets,
              changeLabel: "Awaiting publication",
            }}
          />

          <NetworkAssetCard
            type="members"
            data={{
              value: referredUsers,
              changeLabel: "Users in your network",
            }}
          />
        </section>

        {/* =====================================================
        Toolbar
    ===================================================== */}

        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search network assets..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10"
              />
            </div>

            {/* Status */}
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-primary"
            >
              <option value="">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-700 outline-none focus:border-primary"
            >
              <option value="">All categories</option>
              <option value="audio">Audio</option>
              <option value="visual">Visual</option>
            </select>
          </div>
        </section>

        {/* =====================================================
        Error while refreshing
    ===================================================== */}

        {error && data && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* =====================================================
        Table
    ===================================================== */}

        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Network Assets
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {pagination?.total ?? 0}{" "}
                {pagination?.total === 1 ? "asset" : "assets"} from your
                referred users
              </p>
            </div>

            {loading && (
              <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
            )}
          </div>

          {assets.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/70">
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Asset
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Owner
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Category
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Purchases
                      </th>

                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Revenue
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {assets.map((asset) => {
                      const thumbnail = getAssetThumbnail(asset);

                      const purchaseCount =
                        asset.purchaseCount ?? asset.downloadCount ?? 0;

                      return (
                        <tr
                          key={`${asset.assetType}-${asset._id}`}
                          className="border-b border-gray-100 transition hover:bg-gray-50/70"
                        >
                          {/* Asset */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                {thumbnail ? (
                                  <img
                                    src={thumbnail}
                                    alt={asset.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center">
                                    <Layers className="h-5 w-5 text-gray-400" />
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <p className="max-w-[240px] truncate font-medium text-gray-900">
                                  {asset.title}
                                </p>

                                <p className="mt-1 text-xs capitalize text-gray-400">
                                  {asset.assetType}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Owner */}
                          <td className="px-6 py-4">
                            {asset.owner ? (
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
                                  {asset.owner.photo ? (
                                    <img
                                      src={asset.owner.photo}
                                      alt={`${asset.owner.firstName} ${asset.owner.lastName}`}
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-500">
                                      {asset.owner.firstName?.[0]}
                                      {asset.owner.lastName?.[0]}
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <p className="whitespace-nowrap font-medium text-gray-900">
                                    {asset.owner.firstName}{" "}
                                    {asset.owner.lastName}
                                  </p>

                                  {asset.owner.email && (
                                    <p className="mt-0.5 text-xs text-gray-400">
                                      {asset.owner.email}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">
                                Unknown owner
                              </span>
                            )}
                          </td>

                          {/* Category */}
                          <td className="px-6 py-4">
                            <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium capitalize text-gray-600">
                              {asset.category || "Uncategorized"}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            {asset.status === "published" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                                <FileCheck2 className="h-3.5 w-3.5" />
                                Published
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                                <FileEdit className="h-3.5 w-3.5" />
                                Draft
                              </span>
                            )}
                          </td>

                          {/* Purchases */}
                          <td className="px-6 py-4 text-right">
                            <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                              <Users className="h-4 w-4 text-gray-400" />
                              {purchaseCount.toLocaleString()}
                            </div>
                          </td>

                          {/* Revenue */}
                          <td className="px-6 py-4 text-right">
                            <span className="text-sm font-semibold text-gray-900">
                              {formatCurrency(asset.revenue ?? 0)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* =================================================
              Pagination
          ================================================= */}

              {pagination && pagination.pages > 1 && (
                <div className="flex flex-col gap-4 border-t border-gray-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    Showing{" "}
                    <span className="font-medium text-gray-700">
                      {(pagination.page - 1) * pagination.limit + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium text-gray-700">
                      {Math.min(
                        pagination.page * pagination.limit,
                        pagination.total,
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium text-gray-700">
                      {pagination.total}
                    </span>
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={pagination.page <= 1 || loading}
                      onClick={() =>
                        setPage((current) => Math.max(1, current - 1))
                      }
                      className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>

                    <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-gray-900 px-3 text-sm font-medium text-white">
                      {pagination.page}
                    </div>

                    <button
                      type="button"
                      disabled={pagination.page >= pagination.pages || loading}
                      onClick={() =>
                        setPage((current) =>
                          Math.min(pagination.pages, current + 1),
                        )
                      }
                      className="inline-flex h-9 items-center gap-1 rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}
