<template>
  <baidu-map
    :center="center"
    :zoom="18"
    @ready="handler"
    class="map"
    :mapStyle="mapStyle"
  >
    <bm-view class="map"></bm-view>

    <!--点标注-->
    <!-- position 标注的位置 -->
    <!-- dragging 是否启用拖拽 -->
    <!-- title 鼠标移到marker上显示内容 -->
    <!-- zIndex设置覆盖物的zIndex -->
    <!-- icon标注所用的图标对象 -->
    <!-- dragend 拖拽结束时触发此事件 -->
    <div v-for="(marker, index) of markers" :key="index">
      <bm-marker
        :position="{ lng: marker.lng, lat: marker.lat }"
        @click="lookDetail(marker)"
        :icon="{ url: markerIcon, size: { width: 34, height: 34 } }"
        :dragging="true"
        :zIndex="999999999"
       
      >
        <!-- @mouseout="infoWindowClose(marker)" -->
        <!-- show 是否开启窗体 -->
        <!-- close窗体被关闭时触发的事件 -->
        <!-- open窗体被打开时触发的事件 -->
        <!-- <bm-label
          :content="marker.number"
          :labelStyle="{ color: 'red', fontSize: '24px' }"
          :offset="{ width: -35, height: 30 }"
        /> -->
        <bm-info-window
          :position="{ lng: marker.lng, lat: marker.lat }"
          :show="marker.showFlag"
          @close="infoWindowClose(marker)"
        >
          <div v-for="(item,index) in List" :key="index">
          <div>学号:{{item.id}}</div>
          <div>姓名:{{item.name }}</div>
          <div>学院:{{item.academy}}</div>
          <div>专业:{{item.classname}}</div>
          <div class="end">{{ num }}/{{ total }}</div>
          </div>
        
          <div
            style="display: flex; flex-wrap: wrap; width: 250px"
            class="waring"
          >
            <!-- <div>充电金额：{{ marker.buildName }}</div> -->
            <!-- <div>学号：{{ marker.buildName }}</div> -->
            <!-- <div>充电金额：{{ marker.buildName }}</div> -->
            <!-- <div>姓名：{{ marker.buildName }}</div>
            <div>学院：{{ marker.name }}</div> -->
            <button class="next" @click="next">下一个</button>
          </div>
        </bm-info-window>
      </bm-marker>
    </div>
  </baidu-map>
</template>
<script>
import BmView from "vue-baidu-map/components/map/MapView"; //地图视图
import BmMarker from "vue-baidu-map/components/overlays/Marker"; //点标注
import BmInfoWindow from "vue-baidu-map/components/overlays/InfoWindow"; //标注弹窗
import BmScale from "vue-baidu-map/components/controls/Scale";
import BmNavigation from "vue-baidu-map/components/controls/Navigation";
import {Pin} from "@/api/user.js" 
export default {
  components: {
    BmView,
    BmMarker,
    BmInfoWindow,
    BmScale,
    BmNavigation,
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      setHeading: 64.5,
      setTilt: 73,
      mapStyle: {
        styleJson: [
          {
            featureType: "land",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              color: "#091220ff",
            },
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              color: "#113549ff",
            },
          },
          {
            featureType: "green",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              color: "#0e1b30ff",
            },
          },
          {
            featureType: "building",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              color: "#113549ff",
            },
          },
          {
            featureType: "building",
            elementType: "geometry.topfill",
            stylers: {
              color: "#113549ff",
            },
          },
          {
            featureType: "building",
            elementType: "geometry.sidefill",
            stylers: {
              color: "#143e56ff",
            },
          },
          {
            featureType: "building",
            elementType: "geometry.stroke",
            stylers: {
              color: "#4a90e200",
            },
          },
          {
            featureType: "subwaystation",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              color: "#113549B2",
            },
          },
          {
            featureType: "education",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              color: "#12223dff",
            },
          },
          {
            featureType: "medical",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              color: "#12223dff",
            },
          },
          {
            featureType: "scenicspots",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              color: "#12223dff",
            },
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              weight: 4,
            },
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "highway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#fed66900",
            },
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "highway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "highway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "highway",
            elementType: "labels.icon",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              weight: 2,
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "arterial",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffeebb00",
            },
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "arterial",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "arterial",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "local",
            elementType: "geometry",
            stylers: {
              visibility: "on",
              weight: 1,
            },
          },
          {
            featureType: "local",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "local",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "local",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "local",
            elementType: "labels.text.fill",
            stylers: {
              color: "#979c9aff",
            },
          },
          {
            featureType: "local",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff",
            },
          },
          {
            featureType: "railway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "subway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              weight: 1,
            },
          },
          {
            featureType: "subway",
            elementType: "geometry.fill",
            stylers: {
              color: "#d8d8d8ff",
            },
          },
          {
            featureType: "subway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "subway",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "subway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#979c9aff",
            },
          },
          {
            featureType: "subway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff",
            },
          },
          {
            featureType: "continent",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "continent",
            elementType: "labels.icon",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "continent",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "continent",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "city",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "city",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "city",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "city",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "town",
            elementType: "labels.icon",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "town",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "town",
            elementType: "labels.text.fill",
            stylers: {
              color: "#454d50ff",
            },
          },
          {
            featureType: "town",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff",
            },
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "poilabel",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "districtlabel",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "district",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "poilabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "poilabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "poilabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "manmade",
            elementType: "geometry",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "districtlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffffff",
            },
          },
          {
            featureType: "entertainment",
            elementType: "geometry",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "shopping",
            elementType: "geometry",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "6",
            },
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "7",
            },
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "8",
            },
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "9",
            },
          },
          {
            featureType: "nationalway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "10",
            },
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "6",
            },
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "7",
            },
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "8",
            },
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "9",
            },
          },
          {
            featureType: "nationalway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "10",
            },
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "6",
            },
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "7",
            },
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "8",
            },
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "9",
            },
          },
          {
            featureType: "nationalway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,10",
              level: "10",
            },
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6",
            },
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7",
            },
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8",
            },
          },
          {
            featureType: "cityhighway",
            stylers: {
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "geometry",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "6",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "7",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "8",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "labels",
            stylers: {
              visibility: "off",
              curZoomRegionId: "0",
              curZoomRegion: "6,9",
              level: "9",
            },
          },
          {
            featureType: "subwaylabel",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "subwaylabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "tertiarywaysign",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "tertiarywaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "provincialwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "provincialwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "nationalwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "highwaysign",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "highwaysign",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "village",
            elementType: "labels",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "district",
            elementType: "labels.text",
            stylers: {
              fontsize: 20,
            },
          },
          {
            featureType: "district",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "district",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "country",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "country",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "tertiaryway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "tertiaryway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff10",
            },
          },
          {
            featureType: "provincialway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "provincialway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "nationalway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "nationalway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "highway",
            elementType: "labels.text",
            stylers: {
              fontsize: 20,
            },
          },
          {
            featureType: "nationalway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "nationalway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "nationalway",
            elementType: "labels.text",
            stylers: {
              fontsize: 20,
            },
          },
          {
            featureType: "provincialway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "provincialway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "provincialway",
            elementType: "labels.text",
            stylers: {
              fontsize: 20,
            },
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text",
            stylers: {
              fontsize: 20,
            },
          },
          {
            featureType: "cityhighway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "estate",
            elementType: "geometry",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "tertiaryway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "tertiaryway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "fourlevelway",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "fourlevelway",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "scenicspotsway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "scenicspotsway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "universityway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "universityway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "vacationway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "vacationway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "fourlevelway",
            elementType: "geometry",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "fourlevelway",
            elementType: "geometry.fill",
            stylers: {
              color: "#12223dff",
            },
          },
          {
            featureType: "fourlevelway",
            elementType: "geometry.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "transportationlabel",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "transportationlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "transportationlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "transportationlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "educationlabel",
            elementType: "labels",
            stylers: {
              visibility: "on",
            },
          },
          {
            featureType: "educationlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "educationlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "educationlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "transportation",
            elementType: "geometry",
            stylers: {
              color: "#113549ff",
            },
          },
          {
            featureType: "airportlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "airportlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "medicallabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "medicallabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "medicallabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "scenicspotslabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "airportlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "entertainmentlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "entertainmentlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "entertainmentlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "estatelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "estatelabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "estatelabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "businesstowerlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "businesstowerlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "businesstowerlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "companylabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "companylabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "companylabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "governmentlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "governmentlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "governmentlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "restaurantlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "restaurantlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "restaurantlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "hotellabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "hotellabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "hotellabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "shoppinglabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "shoppinglabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "shoppinglabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "lifeservicelabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "lifeservicelabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "lifeservicelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "carservicelabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "carservicelabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "carservicelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "financelabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "financelabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "financelabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "otherlabel",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "otherlabel",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "otherlabel",
            elementType: "labels.icon",
            stylers: {
              visibility: "off",
            },
          },
          {
            featureType: "manmade",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "manmade",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#4a90e200",
            },
          },
          {
            featureType: "transportation",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "transportation",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#ffffff00",
            },
          },
          {
            featureType: "education",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "education",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#4a90e200",
            },
          },
          {
            featureType: "medical",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "medical",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#4a90e200",
            },
          },
          {
            featureType: "scenicspots",
            elementType: "labels.text.fill",
            stylers: {
              color: "#2dc4bbff",
            },
          },
          {
            featureType: "scenicspots",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#4a90e200",
            },
          },
        ],
      },
      markers: [
        {
          lng: "114.228437",
          lat: "30.6608",
          showFlag: false,
        },
      ],
      markerIcon: "http://api0.map.bdimg.com/images/marker_red_sprite.png", //标注图片
      List:[
        {
          id:0,
          name:"",
          academy:"",
          classname:"",
         
        }
      ],
      num:1,
      total:0
    };
  },
  methods: {
    handler({ BMap, map }) {
      this.center.lng = 114.228835;
      this.center.lat = 30.65893;
      this.setTilt = 73;
      this.setHeading = 64.5;
      map.disableDragging();
    },
    infoWindowClose(marker) {
      marker.showFlag = false;
    },
    lookDetail(marker) {
      marker.showFlag = true; 
    },
    pin(){
      Pin({
        pageNum: 0,
	      pageSize: 1,
      }).then((res)=>{
        
        this.total=res.total
        this.List=res.list
      })
    },
    next(){
      this.num=this.num+1
      Pin(
        {
        pageNum: this.num,
	      pageSize: 1,
      },
      ).then((res)=>{
       
        this.List=res.list
      })
      this.config = { ...this.config };
    }
  },
  mounted(){
    this.pin();
  }
};

</script>

<style>
/* 地图容器必须设置宽和高属性 */
.map {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 1;
}
.next{
  position:absolute;
  left: 200px;
  font-size: 12px;
  cursor: pointer;
}
.end{
  position: relative;
  font-size: 12px;
  top: 30px;
}
</style>