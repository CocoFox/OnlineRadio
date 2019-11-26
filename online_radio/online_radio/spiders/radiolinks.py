# -*- coding: utf-8 -*-
import scrapy
#from scrapy_selenium.SeleniumRequest

class ToScrapeCSSSpider(scrapy.Spider):
    name = "link-spider"
    start_urls = [
        'http://127.0.0.1:8080/',
    ]

    def parse(self, response):
        for url in response.css("li.node"):
            yield {
                "title": url.css("div.li > a.urlextern::text").extract_first(),
                "url": url.css("ul.fix-media-list-overlap > li.level2 > div.li > a.urlextern::attr(href)").extract_first()
            }

